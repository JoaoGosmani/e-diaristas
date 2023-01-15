import { Container } from '@mui/material';
import { FormFieldsContainer, LoginButton } from '@styles/pages/recuperar-senha.styled';
import { useRecuperarSenha } from 'data/hooks/pages/useRecuperarSenha';
import { GetStaticProps } from 'next';
import React from 'react';
import PageTitle from 'ui/components/data-display/PageTitle/PageTitle';
import PasswordStrength from 'ui/components/feedback/PasswordStrength/PasswordStrength';
import TextField from 'ui/components/inputs/TextField/TextField';

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      title: "RecuperarSenha",
    },
  };
};

const RecuperarSenha: React.FC = () => {
  const { router } = useRecuperarSenha();
  return (
    <Container>
      <PageTitle title={"Recuperação de senha"} />
      {router.query.token ? (
        <FormFieldsContainer>
          <TextField label={"Digite seu e-mail"} type={"email"} fullWidth />
          <TextField label={"Digite a nova senha"} type={"password"} fullWidth />
          <TextField label={"Confirme a nova senha"} type={"password"} fullWidth />
          <PasswordStrength password="" />
          <LoginButton size={"large"} variant={"contained"} color={"secondary"}>
            Redefinir senha
          </LoginButton>
        </FormFieldsContainer>
      ) : (
        <FormFieldsContainer>
          <TextField label={"Digite seu e-mail"} type={"email"} />
          <TextField label={"Digite seu token"} type={"text"} />
          <LoginButton size={"large"} variant={"contained"} color={"secondary"}>
            Enviar e-mail
          </LoginButton>
        </FormFieldsContainer>
      )}
    </Container>
  );
};

export default RecuperarSenha;