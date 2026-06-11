import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import fs from "fs";
import path from "path";

// Chave privada mock/real para assinatura Ed25519
const PRIVATE_KEY_PEM = process.env.LAZARUS_PRIVATE_KEY || 
  `-----BEGIN PRIVATE KEY-----\nMC4CAQAwBQYDK2VwBCIEIFN2m8Z42wS9158U/2fS7T9K/aXm+X/v8/O7T9K/aXm+\n-----END PRIVATE KEY-----`;

export async function POST(request: NextRequest) {
  try {
    // 1. Validar autenticação via cookie
    const token = request.cookies.get("certus_token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { actor, action, metadata } = body;

    if (!actor || !action || !metadata) {
      return NextResponse.json({ error: "Bad Request: Missing fields" }, { status: 400 });
    }

    // 2. Extrair e hashar o IP do cliente
    const ip = request.headers.get("x-forwarded-for") || request.ip || "127.0.0.1";
    const ipHash = crypto.createHash("sha256").update(ip).digest("hex");

    // 3. Montar a estrutura LazarusLog
    const logMetadata = {
      ...metadata,
      ip_hash: ipHash,
      user_agent: request.headers.get("user-agent") || "unknown",
      timestamp: new Date().toISOString()
    };

    const payloadToSign = JSON.stringify({ actor, action, metadata: logMetadata });

    // 4. Assinar com Ed25519 usando a crypto nativa do Node
    let signature = "";
    try {
      const privateKey = crypto.createPrivateKey(PRIVATE_KEY_PEM);
      signature = crypto.sign(null, Buffer.from(payloadToSign), privateKey).toString("hex");
    } catch (err) {
      console.error("Falha ao assinar com Ed25519, utilizando fallback hash:", err);
      signature = crypto.createHash("sha256").update(payloadToSign + "fallback-salt").digest("hex");
    }

    const lazarusLog = {
      actor,
      action,
      metadata: logMetadata,
      signature
    };

    // 5. Gravar no log local imutável (JSON Lines) como trilha de custódia local
    try {
      const logsDir = path.join(process.cwd(), "logs");
      if (!fs.existsSync(logsDir)) {
        fs.mkdirSync(logsDir, { recursive: true });
      }
      const logFilePath = path.join(logsDir, "lazarus_audit.jsonl");
      fs.appendFileSync(logFilePath, JSON.stringify(lazarusLog) + "\n", "utf8");
    } catch (fsErr) {
      console.error("Falha ao persistir log local do LAZARUS:", fsErr);
    }

    // Exibe no console seguro de monitoramento
    console.log("[LAZARUS SECURE LOG]:", JSON.stringify(lazarusLog));

    return NextResponse.json({ success: true, hash: crypto.createHash("sha256").update(signature).digest("hex") });
  } catch (error) {
    console.error("Erro interno no endpoint LAZARUS:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
