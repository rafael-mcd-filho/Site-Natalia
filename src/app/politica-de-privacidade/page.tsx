import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { createMetadata } from '@/lib/seo'
import styles from '../legal.module.css'

export const metadata: Metadata = createMetadata({
  title: 'Política de Privacidade | Porto Talent',
  description: 'Como a Porto Talent coleta, usa e protege dados pessoais recebidos pelo site.',
  path: '/politica-de-privacidade',
})

export default function PoliticaDePrivacidadePage() {
  return (
    <main className={styles.shell}>
      <header className={styles.topbar}>
        <div className={styles.topbarInner}>
          <Link className={styles.brand} href="/" aria-label="Porto Talent — página inicial">
            <Image
              src="/brand/porto-talent-logo.png"
              alt="Porto Talent — Consultoria e Recrutamento"
              width={1282}
              height={1020}
              className={styles.brandLogo}
              sizes="72px"
            />
          </Link>
          <Link className={styles.backLink} href="/">Voltar para o site</Link>
        </div>
      </header>

      <article className={styles.main}>
        <span className={styles.eyebrow}>Privacidade</span>
        <h1 className={styles.title}>Política de Privacidade</h1>
        <p className={styles.updated}>Última atualização: 21 de maio de 2026.</p>

        <div className={styles.content}>
          <section className={styles.note}>
            <p>
              Esta política explica como a Porto Talent trata os dados enviados pelo site, em especial nos
              formulários de contato de empresas e no cadastro de currículos de candidatos.
            </p>
          </section>

          <section className={styles.section}>
            <h2>1. Quem somos</h2>
            <p>
              A Porto Talent presta serviços de consultoria de recrutamento e seleção, conectando empresas a
              profissionais alinhados ao perfil técnico, comportamental e cultural de cada vaga.
            </p>
            <p>
              Para assuntos de privacidade, você pode entrar em contato pelo e-mail{' '}
              <a href="mailto:atendimento@portotalentconsultoria.com">atendimento@portotalentconsultoria.com</a> ou pelo WhatsApp{' '}
              <a href="https://wa.me/558387523450" target="_blank" rel="noopener noreferrer">
                (83) 8752-3450
              </a>.
            </p>
          </section>

          <section className={styles.section}>
            <h2>2. Dados que coletamos</h2>
            <p>Podemos coletar dados fornecidos diretamente por você nos formulários do site:</p>
            <ul>
              <li>
                Empresas: nome, empresa, e-mail, WhatsApp, vaga desejada, quantidade de colaboradores desejada,
                prazo de contratação e mensagem opcional.
              </li>
              <li>
                Candidatos: nome, e-mail, WhatsApp, cidade/estado, área de atuação, cargo atual ou mais recente,
                experiência, pretensão salarial opcional, LinkedIn opcional e arquivo de currículo.
              </li>
              <li>Dados técnicos essenciais para segurança, funcionamento do site e administração do painel.</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>3. Para que usamos os dados</h2>
            <ul>
              <li>Responder solicitações de empresas interessadas em processos de recrutamento.</li>
              <li>Avaliar currículos enviados por candidatos e considerar perfis para oportunidades futuras.</li>
              <li>Entrar em contato por e-mail, telefone ou WhatsApp quando houver aderência ao perfil informado.</li>
              <li>Organizar e administrar os leads recebidos no painel interno da Porto Talent.</li>
              <li>Cumprir obrigações legais, regulatórias e de segurança da informação.</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>4. Bases legais</h2>
            <p>
              Tratamos dados pessoais conforme a Lei Geral de Proteção de Dados Pessoais, Lei nº 13.709/2018
              (LGPD). As bases legais podem incluir consentimento, execução de procedimentos preliminares,
              legítimo interesse e cumprimento de obrigações legais, conforme o contexto de cada tratamento.
            </p>
          </section>

          <section className={styles.section}>
            <h2>5. Compartilhamento</h2>
            <p>
              Dados de candidatos podem ser compartilhados com empresas contratantes ou potenciais contratantes
              apenas quando houver compatibilidade com uma vaga ou processo seletivo. Também podemos usar
              fornecedores de tecnologia, hospedagem, banco de dados e armazenamento de arquivos para operar o site
              e o painel.
            </p>
            <p>
              Não vendemos dados pessoais.
            </p>
          </section>

          <section className={styles.section}>
            <h2>6. Currículos e arquivos</h2>
            <p>
              Currículos enviados pelo formulário são armazenados em ambiente restrito e usados para avaliação de
              perfil profissional. O acesso é limitado a pessoas autorizadas envolvidas nos processos de recrutamento
              e seleção.
            </p>
          </section>

          <section className={styles.section}>
            <h2>7. Retenção</h2>
            <p>
              Os dados serão mantidos pelo tempo necessário para cumprir as finalidades descritas nesta política,
              incluindo relacionamento com empresas, banco de talentos, prestação de contas e cumprimento de
              obrigações legais. Você pode solicitar a exclusão dos seus dados, observadas as hipóteses legais de
              conservação.
            </p>
          </section>

          <section className={styles.section}>
            <h2>8. Seus direitos</h2>
            <p>Nos termos da LGPD, você pode solicitar, quando aplicável:</p>
            <ul>
              <li>confirmação da existência de tratamento;</li>
              <li>acesso aos dados;</li>
              <li>correção de dados incompletos, inexatos ou desatualizados;</li>
              <li>anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos;</li>
              <li>portabilidade, quando aplicável;</li>
              <li>informações sobre compartilhamento;</li>
              <li>revogação do consentimento.</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>9. Segurança</h2>
            <p>
              Adotamos medidas técnicas e organizacionais razoáveis para proteger os dados contra acessos não
              autorizados, perda, alteração ou divulgação indevida. Ainda assim, nenhum sistema é totalmente imune a
              riscos, e recomendamos que você evite enviar informações sensíveis que não sejam necessárias ao
              processo seletivo.
            </p>
          </section>

          <section className={styles.section}>
            <h2>10. Cookies e tecnologias semelhantes</h2>
            <p>
              O site pode utilizar cookies essenciais e recursos técnicos necessários para funcionamento,
              segurança, formulários e acesso administrativo. Caso sejam adicionadas ferramentas de analytics,
              anúncios ou rastreamento, esta política deverá ser atualizada.
            </p>
          </section>

          <section className={styles.contactBox}>
            <h2>Contato sobre privacidade</h2>
            <p>
              E-mail: <a href="mailto:atendimento@portotalentconsultoria.com">atendimento@portotalentconsultoria.com</a>
            </p>
            <p>
              WhatsApp:{' '}
              <a href="https://wa.me/558387523450" target="_blank" rel="noopener noreferrer">
                (83) 8752-3450
              </a>
            </p>
            <p>Endereço: Rua Manoel Medeiros Guedes, 12, sala 201, Manaíra, João Pessoa/PB, 58038-360, Brasil.</p>
          </section>
        </div>
      </article>
    </main>
  )
}
