//Maneja la API de Twilio
const twilio = require("twilio");
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const sendMessage = async(to, message) =>{
    try {
        const response = await client.messages.create({
            from: "whatsapp:+14155238886", //Número de Twilio habilitado
            to: `whatsapp:${to}`,
            body: message,
        });
        console.log("Mensaje enviado: ", response.sid);
    } catch (error) {
        console.log("Error enviando mensaje: ", error.message);
    }
};

module.exports = {sendMessage};