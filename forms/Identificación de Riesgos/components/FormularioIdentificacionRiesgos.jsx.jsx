// components/FormularioIdentificacionRiesgos.jsx
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { riskIdentificationFormAction } from "@/lib/actions";

const initialState = {
  defaultValues: {
    nombre: "",
    identificacion: "",
    cargo: "",
    proyecto: "",
    ciudad: "",
    genero: "",
    sugerencias: "",
    riesgos: {},
  },
  success: false,
  errors: null,
};

export default function FormularioIdentificacionRiesgos() {
  const [state, formAction, pending] = React.useActionState(riskIdentificationFormAction, initialState);

  return (
    <Card>
      <CardHeader>
        <CardTitle>GESTIÓN DE CALIDAD Y SST</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction}>
          <h2>Formulario: Identificación de Riesgos - PROYECTOS</h2>
          <p>CÓDIGO: GCSST-REG-062 | VERSIÓN: 1 | FECHA: 1/03/2024</p>
          <p>
            OBJETIVO: Identificar los RIESGOS relacionados con las ocupaciones o actividades rutinarias y no
            rutinarias que desempeñan todos los cargos o niveles de la organización.
          </p>
          <p>ALCANCE: Aplica a todos los niveles y cargos de la empresa.</p>
          <p>APLICACIÓN: Al iniciar cada proyecto</p>

          {/* Mensaje de éxito */}
          {state.success && <p>Formulario enviado correctamente.</p>}

          {/* Campos del formulario */}
          <div>
            <Label htmlFor="nombre">NOMBRE COMPLETO:</Label>
            <Input id="nombre" name="nombre" />
            {state.errors?.nombre && <p>{state.errors.nombre}</p>}
          </div>

          <div>
            <Label htmlFor="identificacion">N° DE IDENTIFICACIÓN:</Label>
            <Input id="identificacion" name="identificacion" />
            {state.errors?.identificacion && <p>{state.errors.identificacion}</p>}
          </div>

          <div>
            <Label htmlFor="cargo">CARGO:</Label>
            <Input id="cargo" name="cargo" />
            {state.errors?.cargo && <p>{state.errors.cargo}</p>}
          </div>

          <div>
            <Label htmlFor="proyecto">PROYECTO:</Label>
            <Input id="proyecto" name="proyecto" />
            {state.errors?.proyecto && <p>{state.errors.proyecto}</p>}
          </div>

          <div>
            <Label htmlFor="ciudad">CIUDAD:</Label>
            <Input id="ciudad" name="ciudad" />
            {state.errors?.ciudad && <p>{state.errors.ciudad}</p>}
          </div>

          <div>
            <Label>GÉNERO:</Label>
            <RadioGroup name="genero">
              <div>
                <RadioGroupItem value="M" id="genero-m" />
                <Label htmlFor="genero-m">M</Label>
              </div>
              <div>
                <RadioGroupItem value="F" id="genero-f" />
                <Label htmlFor="genero-f">F</Label>
              </div>
            </RadioGroup>
            {state.errors?.genero && <p>{state.errors.genero}</p>}
          </div>

          {/* Sección de identificación de riesgos */}
          <h3>IDENTIFICACIÓN DE PELIGROS Y RIESGOS</h3>
          <p>
            Marque únicamente los RIESGOS a los que se expone en su ocupación o mientras realiza sus labores
            rutinarias y no rutinarias en este proyecto.
          </p>

          {/* RIESGOS FÍSICOS */}
          <h4>RIESGOS FÍSICOS</h4>
          <Checkbox name="riesgos.ruido" /> Ruido
          <Checkbox name="riesgos.vibracion" /> Vibración
          <Checkbox name="riesgos.temperaturasExtremasFrio" /> Temperaturas extremas por Frío
          <Checkbox name="riesgos.temperaturasExtremasCalor" /> Temperaturas Extremas por Calor
          <Checkbox name="riesgos.radiacionesIonizantes" /> Radiaciones Ionizantes
          <Checkbox name="riesgos.radiacionesNoIonizantes" /> Radiaciones no Ionizantes

          {/* RIESGOS QUÍMICOS */}
          <h4>RIESGOS QUÍMICOS</h4>
          <Checkbox name="riesgos.vapores" /> Vapores
          <Checkbox name="riesgos.fibras" /> Fibras
          <Checkbox name="riesgos.polvosHumos" /> Polvos y Humos
          <Checkbox name="riesgos.nieblas" /> Nieblas

          {/* RIESGOS BIOLÓGICOS */}
          <h4>RIESGOS BIOLÓGICOS</h4>
          <Checkbox name="riesgos.virus" /> Virus
          <Checkbox name="riesgos.bacterias" /> Bacterias
          <Checkbox name="riesgos.hongos" /> Hongos

          {/* RIESGOS BIOMECÁNICOS */}
          <h4>RIESGOS BIOMECÁNICOS</h4>
          <Checkbox name="riesgos.posturasInadecuadas" /> Posturas inadecuadas
          <Checkbox name="riesgos.movimientosRepetitivos" /> Movimientos repetitivos
          <Checkbox name="riesgos.manipulacionCargas" /> Manipulación de cargas

          {/* RIESGOS DE SEGURIDAD */}
          <h4>RIESGOS DE SEGURIDAD</h4>
          <Checkbox name="riesgos.mecanicos" /> Mecánicos
          <Checkbox name="riesgos.electrico" /> Eléctrico
          <Checkbox name="riesgos.locativos" /> Locativos
          <Checkbox name="riesgos.fisicoQuimico" /> Físico-Químico

          {/* RIESGOS FENÓMENOS NATURALES */}
          <h4>RIESGOS FENÓMENOS NATURALES</h4>
          <Checkbox name="riesgos.terremotos" /> Terremotos
          <Checkbox name="riesgos.inundaciones" /> Inundaciones
          <Checkbox name="riesgos.avalanchas" /> Avalanchas

          {/* RIESGOS PÚBLICOS */}
          <h4>RIESGOS PÚBLICOS</h4>
          <Checkbox name="riesgos.hurto" /> Hurto
          <Checkbox name="riesgos.manifestaciones" /> Manifestaciones
          <Checkbox name="riesgos.terrorismo" /> Terrorismo

          {/* RIESGO PSICOSOCIAL */}
          <h4>RIESGO PSICOSOCIAL</h4>
          <Checkbox name="riesgos.granCantidadInformacion" />
          Se maneja gran cantidad de información, es compleja y/o debe emplearse de manera simultánea
          <Checkbox name="riesgos.responsabilidadManejo" />
          Se tiene responsabilidad por manejo de dinero, bienes, salud o seguridad de otras personas
          <Checkbox name="riesgos.jornadasExtensas" />
          Las jornadas de trabajo son extensas, en horario nocturno y/o sin descanso
          <Checkbox name="riesgos.tratoNegativo" />
          Se expone a trato negativo del público y/o de compañeros de trabajo
          <Checkbox name="riesgos.comunicacionEscasa" />
          La comunicación con otras personas es escasa y/o conflictiva
          <Checkbox name="riesgos.esfuerzoFisicoFatiga" />
          El trabajo y las condiciones en que se realiza implica un gran esfuerzo físico y fatiga

          {/* Campo de sugerencias */}
          <div>
            <Label htmlFor="sugerencias">QUE HACER PARA MINIMIZAR LOS RIESGOS:</Label>
            <Textarea id="sugerencias" name="sugerencias" />
            {state.errors?.sugerencias && <p>{state.errors.sugerencias}</p>}
          </div>

          {/* Botón de envío */}
          <Button type="submit" disabled={pending}>
            {pending ? "Enviando..." : "FIRMA DE TRABAJADOR"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}