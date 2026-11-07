"use client";

import { EMAIL, PHONE } from "@/lib/content";
import { UI, useLang, type L } from "@/lib/i18n";

// PENDIENTE: completar con los datos fiscales reales del cliente (razón social, CIF, domicilio).
const TXT: { id: string; titulo: L; parrafos: L[] }[] = [
  {
    id: "aviso-legal",
    titulo: UI.footer.aviso,
    parrafos: [
      {
        es: `En cumplimiento de la Ley 34/2002, de Servicios de la Sociedad de la Información y de Comercio Electrónico, se informa de que este sitio web es titularidad de Grupo O'Pulpiño. Contacto: ${EMAIL} · ${PHONE}.`,
        en: `In accordance with Spanish Law 34/2002 on Information Society Services and E-commerce, this website is owned by Grupo O'Pulpiño. Contact: ${EMAIL} · ${PHONE}.`,
        gl: `En cumprimento da Lei 34/2002, de Servizos da Sociedade da Información e de Comercio Electrónico, infórmase de que este sitio web é titularidade de Grupo O'Pulpiño. Contacto: ${EMAIL} · ${PHONE}.`,
      },
      {
        es: "El acceso y uso de este sitio implica la aceptación de estas condiciones. Los contenidos (textos, imágenes, logotipos y diseño) están protegidos por la normativa de propiedad intelectual e industrial.",
        en: "Accessing and using this site implies acceptance of these terms. All content (text, images, logos and design) is protected by intellectual and industrial property law.",
        gl: "O acceso e uso deste sitio implica a aceptación destas condicións. Os contidos (textos, imaxes, logotipos e deseño) están protexidos pola normativa de propiedade intelectual e industrial.",
      },
    ],
  },
  {
    id: "privacidad",
    titulo: UI.footer.privacidad,
    parrafos: [
      {
        es: "Los datos personales que nos facilites a través de los formularios se tratarán con la finalidad de atender tu consulta, gestionar tu reserva o elaborar el presupuesto solicitado, conforme al Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD).",
        en: "Personal data you provide through our forms will be processed to answer your enquiry, manage your booking or prepare the requested quote, in accordance with Regulation (EU) 2016/679 (GDPR) and Spanish Organic Law 3/2018.",
        gl: "Os datos persoais que nos facilites a través dos formularios trataranse coa finalidade de atender a túa consulta, xestionar a túa reserva ou elaborar o orzamento solicitado, conforme ao Regulamento (UE) 2016/679 (RXPD) e a Lei Orgánica 3/2018 (LOPDGDD).",
      },
      {
        es: `No se cederán datos a terceros salvo obligación legal. Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a ${EMAIL}.`,
        en: `Data will not be shared with third parties unless legally required. You may exercise your rights of access, rectification, erasure, objection, restriction and portability by writing to ${EMAIL}.`,
        gl: `Non se cederán datos a terceiros salvo obriga legal. Podes exercer os teus dereitos de acceso, rectificación, supresión, oposición, limitación e portabilidade escribindo a ${EMAIL}.`,
      },
    ],
  },
  {
    id: "cookies",
    titulo: UI.footer.cookies,
    parrafos: [
      {
        es: "Este sitio utiliza únicamente almacenamiento técnico necesario para su funcionamiento (por ejemplo, recordar tu idioma). Los servicios integrados de terceros, como Google Maps, pueden instalar sus propias cookies, sujetas a sus respectivas políticas.",
        en: "This site only uses technical storage needed for it to work (for example, remembering your language). Embedded third-party services such as Google Maps may set their own cookies, subject to their own policies.",
        gl: "Este sitio utiliza unicamente almacenamento técnico necesario para o seu funcionamento (por exemplo, lembrar o teu idioma). Os servizos integrados de terceiros, como Google Maps, poden instalar as súas propias cookies, suxeitas ás súas respectivas políticas.",
      },
    ],
  },
];

export default function LegalView() {
  const { t } = useLang();
  return (
    <div className="mx-auto max-w-3xl px-5 pt-40 pb-28 md:px-8">
      <h1 className="font-display text-4xl font-medium tracking-tight md:text-5xl">
        {t(UI.footer.aviso)} · {t(UI.footer.privacidad)}
      </h1>
      <div className="mt-12 space-y-16 leading-relaxed text-tiza/75">
        {TXT.map((sec) => (
          <section key={sec.id} id={sec.id} className="scroll-mt-28">
            <h2 className="mb-4 font-display text-3xl text-tiza">{t(sec.titulo)}</h2>
            {sec.parrafos.map((p, i) => (
              <p key={i} className="mt-3">
                {t(p)}
              </p>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
