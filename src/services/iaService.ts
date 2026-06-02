export interface DatosFactura {
  descripcion: string;
  monto: number | undefined;
  categoria: string;
  observacion: string;
}

export const analizarFactura = async (
  fotoBase64: string,
): Promise<DatosFactura> => {
  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "meta-llama/llama-4-scout-17b-16e-instruct",
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: `Analiza esta imagen de un recibo o factura y extrae la información. 
                Responde SOLO con un JSON con este formato exacto, sin texto adicional:
                {
                  "descripcion": "nombre del producto o servicio principal",
                  "monto": número total a pagar (solo el número, sin símbolos),
                  "categoria": "una de estas: Alimentación, Transporte, Educación, Salud, Hogar, Entretenimiento, Servicios, Otros",
                  "observacion": "nombre del establecimiento o detalle relevante"
                }`,
                },
                {
                  type: "image_url",
                  image_url: {
                    url: `data:image/jpeg;base64,${fotoBase64}`,
                  },
                },
              ],
            },
          ],
          max_tokens: 500,
        }),
      },
    );

    const data = await response.json();
    const texto = data.choices[0].message.content;
    const jsonLimpio = texto.replace(/```json|```/g, "").trim();
    return JSON.parse(jsonLimpio);
  } catch (error) {
    console.error("Error analizando factura:", error);
    return {
      descripcion: "",
      monto: undefined,
      categoria: "",
      observacion: "",
    };
  }
};