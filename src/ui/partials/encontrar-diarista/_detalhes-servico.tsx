import { Divider, Tooltip, Typography } from "@mui/material";
import { FormValues } from "data/@types/forms/FormValues";
import { ServicoInterface } from "data/@types/ServicoInterface";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import ItemCounter from "ui/components/inputs/ItemCounter/ItemCounter";
import TextFieldMask from "ui/components/inputs/TextFieldMask/TextFieldMask";
import ToggleButtonGroup, {
    ToggleButton
} from "ui/components/inputs/ToggleButtonGroup/ToggleButtonGroup";
import { AddressForm } from "ui/components/inputs/UserForm/UserForm";
import { ItemsContainer } from "./_detalhes-servico.styled";

interface DetalhesServicoProps {
    servicos?: ServicoInterface[];
}

const houseParts = [
    {
        singular: "Cozinha",
        plural: "Cozinhas",
        name: "quantidade_cozinhas",
    },
    {
        singular: "Sala",
        plural: "Salas",
        name: "quantidade_salas", 
    },
    {
        singular: "Banheiro",
        plural: "Banheiros",
        name: "quantidade_banheiros",
    },
    {
        singular: "Quarto",
        plural: "Quartos",
        name: "quantidade_quartos",
    },
    {
        singular: "Quintal",
        plural: "Quintais",
        name: "quantidade_quintais",
    },
    {
        singular: "Outros",
        plural: "Outros",
        name: "quantidade_outros",
    },
];

const DetalhesServico: React.FC<DetalhesServicoProps> = ({ servicos = [] }) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext<FormValues>();
    return (
        <div>
            <Typography sx={{ fontWeight: "bold", pb: 2 }}>
                Qual tipo de limpeza você precisa?
            </Typography>
            <Controller 
                name={"faxina.servico"}
                defaultValue={servicos[0]?.id}
                control={control}
                render={({ field }) => (
                    <ToggleButtonGroup
                        exclusive
                        value={field.value}
                        onChange={(_event, value) =>
                            field.onChange(value ?? servicos[0]?.id)
                        }
                    >
                        {servicos.map((servico) => (
                            <ToggleButton key={servico.id} value={servico.id}>
                                <i className={servico.icone ?? "twf-cleaning-1"} />
                                {servico.nome}
                            </ToggleButton>
                        ))}
                    </ToggleButtonGroup>
                )}
            />

            <Divider sx={{ my: 5 }} />
            <Typography sx={{ fontWeight: "bold", mb: 2 }}>
                Qual o tamanho da sua casa?
            </Typography>

            <ItemsContainer>
                {houseParts.map((item) => (
                    <Controller
                        key={item.name}
                        name={`faxina.${item.name}` as any}
                        defaultValue={0}
                        control={control}
                        render={({ field }) => ( 
                            <ItemCounter 
                                label={item.singular}
                                plural={item.plural}
                                counter={field.value as number}
                                onInc={() => field.onChange((field.value as number) + 1)}
                                onDec={() => 
                                    field.onChange(Math.max(0, (field.value as number) - 1))
                                }
                            />
                        )} 
                    />
                ))}
            </ItemsContainer>
            <Divider sx={{ my: 5 }} />

            <Typography sx={{ fontWeight: "bold", mb: 2 }} >
                Qual a data em que você gostaria de receber o/a diarista?
            </Typography>

            <ItemsContainer>
                <Controller 
                    name={"faxina.data_atendimento"}
                    defaultValue={""}
                    control={control}
                    render={({ field: { ref, ...inputProps } }) => (
                        <TextFieldMask 
                            {...inputProps}
                            inputRef={ref}
                            mask={"99/99/9999"}
                            label={"Data"}
                            error={errors?.faxina?.data_atendimento != undefined}
                            helperText={errors?.faxina?.data_atendimento?.message}      
                        />
                    )}
                />

                <Controller 
                    name={"faxina.hora_inicio"}
                    defaultValue={""}
                    control={control}
                    render={({ field: { ref, ...inputProps } }) => (
                        <TextFieldMask 
                            {...inputProps}
                            inputRef={ref}
                            mask={"99:99"}
                            label={"Hora Início"}
                            error={errors?.faxina?.hora_inicio != undefined}
                            helperText={errors?.faxina?.hora_inicio?.message}      
                        />
                    )}
                />

                <Controller 
                    name={"faxina.hora_termino"}
                    defaultValue={""}
                    control={control}
                    render={({ field: { ref, ...inputProps } }) => (
                        <Tooltip title={"Campo Automático"}>
                            <div>
                                <TextFieldMask 
                                    {...inputProps}
                                    inputProps={{ readOnly: true, disable: true}}
                                    inputRef={ref}
                                    mask={"99:99"}
                                    label={"Hora Término"}
                                    error={errors?.faxina?.hora_termino != undefined}
                                    helperText={errors?.faxina?.hora_termino?.message}      
                                />  
                            </div>
                        </Tooltip>
                        
                    )}
                />
            </ItemsContainer>

            <Divider sx={{ my: 5 }} />
            <AddressForm />
        </div>
    );
};

export default DetalhesServico;