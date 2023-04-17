import Box from "@src/components/Box";
import Button from "@src/components/Button/Button";
import Image from "@src/components/Image/Image";
import Text from "@src/components/Text";
import { BaseComponent } from "@src/theme/BaseComponent";
import Head from "next/head";
import React from 'react'
import Swal from "sweetalert2";
import { colors } from "@src/theme/defaults/colors";


function useForm({ initialValues }) {
  const [values, setValues] = React.useState(initialValues);

  return {
    values,
    handleChange(evento) {
      const { name, value } = evento.target;
      console.log(name, value);
      setValues({
        ...values,
        [name]: value,
      })
    }
  };
}

export default function NewsletterScreen() {

  const form = useForm({
    initialValues: {
      emailNewsletter: ""
    }
  });

  return (
    <>
      <Head>
        <title>Newsletter Guilherme Cunha</title>
      </Head>
      <Box
        styleSheet={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >


        <form
          onSubmit={(evento) => {
            evento.preventDefault();
            console.log("Estamos enviando os dados do formulario!");


            if (!form.values.emailNewsletter.includes("@")) {

              Swal.fire({
                title: 'Erro!',
                text: 'Você precisa informar um email valido!',
                icon: 'error',
                confirmButtonColor: colors.negative.x500,
              });
              return;
            }

            Swal.fire({
              title: 'Muito bem!',
              text: 'Você foi cadastrado com sucesso! Cheque seu email para garantir',
              icon: 'success',
              confirmButtonColor: colors.positive.x500,
              backdrop: `
        rgba(123,123,123,0.3)
        url("gifs-de-confete.gif")
        left top 
      `
            });

            fetch("/api/newsletter", {
              method: "POST",
              body: JSON.stringify(form.values),
              headers: {
                "Content-Type": "application/json",
              }
            })
              .then(async (respostaDoServer) => {
                console.log(await respostaDoServer.json());
              })
          }}
        >
          <Box
            styleSheet={{
              alignItems: "center",
              width: "100%",
              maxWidth: "400px",
              padding: "16px"
            }}
          >
            <Image
              src="https://github.com/GuilhermeCCunha.png"
              alt="Foto do DevSoutinho"
              styleSheet={{
                borderRadius: "100%",
                width: "100px",
                marginBottom: "16px"
              }}
            />
            <Text variant="heading2">
              Newsletter do Guilherme Cunha
            </Text>
            <NewsletterTextField
              placeholder="Informe seu email"
              name="emailNewsletter"
              value={form.values.emailNewsletter}
              onChange={form.handleChange}
            />
            <Box>
              <Text>
                Seu email é: {form.values.emailNewsletter}
              </Text>
            </Box>
            <Button fullWidth colorVariant="positive" styleSheet={{ marginTop: "16px" }}>
              Cadastrar
            </Button>
          </Box>
        </form>
      </Box>
    </>

  )
}

interface NewsletterTextFieldProps {
  placeholder?: string;
  value?: string;
  name: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
function NewsletterTextField(props: NewsletterTextFieldProps) {
  return (
    <Box
      styleSheet={{
        maxWidth: "300px",
        width: "100%"
      }}
    >
      <BaseComponent
        as="input"
        {...props}
        styleSheet={{
          border: "1px solid rgb(195,195,195)",
          borderRadius: "4px",
          padding: "8px",
          width: "100%"
        }}
      />
    </Box>
  )
}

