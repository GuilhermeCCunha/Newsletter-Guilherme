import sendGridMail from "@sendgrid/mail";
import { NextApiRequest, NextApiResponse } from "next";
import { dbClient } from "lib/initSupabase";

const httpStatus = {
  Success: 200,
  BadRequest: 400,
  NotFound: 404,
  InternalServerError: 500,
};

const controllerByMethod = {
  async POST(req: NextApiRequest, res: NextApiResponse) { 
    console.log(req.body.emailNewsletter);
    const email = req.body.emailNewsletter;

    
    if(!Boolean(email) || !email.includes("@")) {
      res
        .status(httpStatus.BadRequest)
        .json({ message: "Você precisa enviar um email valido ex: teste@teste.com" });
      return;   
    }


    const { error } = await dbClient.from("newsletter_users").insert({ email: email, optin: true });
  
    await dbClient.auth.admin.createUser({ email: email });
    
    try {
      console.log(process.env.SENDGRID_KEY);
      sendGridMail.setApiKey(process.env.SENDGRID_KEY);
      
      await sendGridMail.send({
        to:[ email, 'guilhermecdacunha@gmail.com'],
        from: "guilhermecdacunha@gmail.com",
        subject: "Newsletter do Guilherme Cunha",
        html: `Obrigado, <strong>${email}</strong> por assinar a minha Newsletter!`
      });

      res
        .status(httpStatus.Success)
        .json({ message: "Post request!" });
    } catch (err) {
      console.error(err);
      res
        .status(httpStatus.InternalServerError)
        .json({ message: "Falhamos em enviar seu email!" });
    }
  },
  async GET(req: NextApiRequest, res: NextApiResponse) { 
    const { data, error } = await dbClient
                    .from("newsletter_users")
                    .select("*");

    console.log(data);
    console.log(error);

    res
      .status(httpStatus.Success)
      .json({ message: "Get request!", total: data.length });
  }
}

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const controller = controllerByMethod[request.method];
  if(!controller) {
    response
      .status(httpStatus.NotFound)
      .json({ message: "Nada encontrado aqui :(" });
    return;
  }
  
  controller(request, response);
}

