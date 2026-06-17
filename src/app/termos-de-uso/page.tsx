import type { Metadata } from 'next'
import Link from 'next/link'
import { createMetadata } from '@/lib/seo'
import styles from '../legal.module.css'

export const metadata: Metadata = createMetadata({
  title: 'Termos de Uso e Política de Privacidade | Porto Talent',
  description: 'Condições de uso do site e política de privacidade da Porto Talent.',
  path: '/termos-de-uso',
})

export default function TermosDeUsoPage() {
  return (
    <main className={styles.shell}>
      <header className={styles.topbar}>
        <div className={styles.topbarInner}>
          <Link className={styles.brand} href="/">Porto Talent</Link>
          <Link className={styles.backLink} href="/">Voltar para o site</Link>
        </div>
      </header>

      <article className={styles.main}>
        <span className={styles.eyebrow}>Termos</span>
        <h1 className={styles.title}>Termos de Uso</h1>
        <p className={styles.updated}>Última atualização: 02 de junho de 2026.</p>

        <div className={styles.content}>
          <section className={styles.note}>
            <p>
              Ao acessar o site da Porto Talent ou enviar informações pelos formulários, você declara que leu e
              concorda com estes termos.
            </p>
          </section>

          <section className={styles.section}>
            <h2>1. Objetivo do site</h2>
            <p>
              O site apresenta os serviços de consultoria de recrutamento e seleção da Porto Talent e disponibiliza
              canais para que empresas solicitem contato e candidatos enviem currículos para avaliação de perfil.
            </p>
          </section>

          <section className={styles.section}>
            <h2>2. Uso permitido</h2>
            <p>Você se compromete a usar o site de forma lícita, respeitosa e compatível com sua finalidade.</p>
            <ul>
              <li>Não envie informações falsas, ofensivas, ilegais ou de terceiros sem autorização.</li>
              <li>Não tente acessar áreas restritas, sistemas internos, banco de dados ou painel administrativo.</li>
              <li>Não utilize o site para spam, fraudes, engenharia reversa ou interferência técnica.</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>3. Formulários de empresas</h2>
            <p>
              O envio de uma solicitação de contato não gera obrigação automática de contratação, proposta comercial
              ou prestação de serviços. A Porto Talent poderá entrar em contato para entender a demanda, avaliar o
              perfil da vaga e apresentar condições específicas.
            </p>
          </section>

          <section className={styles.section}>
            <h2>4. Cadastro de candidatos</h2>
            <p>
              O envio de currículo não garante participação em processo seletivo, entrevista, indicação para empresas
              ou contratação. A Porto Talent poderá manter o currículo em banco de talentos e entrar em contato quando
              identificar oportunidades compatíveis.
            </p>
          </section>

          <section className={styles.section}>
            <h2>5. Responsabilidade pelas informações</h2>
            <p>
              Você é responsável pela veracidade, atualidade e autorização de uso das informações fornecidas. Caso
              identifique erro nos dados enviados, entre em contato para solicitar correção.
            </p>
          </section>

          <section className={styles.section}>
            <h2>6. Propriedade intelectual</h2>
            <p>
              Textos, layout, identidade visual, imagens, elementos gráficos e demais conteúdos do site pertencem à
              Porto Talent ou são usados mediante licença/autorização. A reprodução, cópia, distribuição ou uso
              comercial sem autorização prévia é proibida.
            </p>
          </section>

          <section className={styles.section}>
            <h2>7. Links e terceiros</h2>
            <p>
              O site pode conter links para WhatsApp, e-mail, redes sociais, plataformas de armazenamento ou outros
              serviços de terceiros. A Porto Talent não controla esses ambientes externos e recomenda a leitura dos
              termos e políticas de cada fornecedor.
            </p>
          </section>

          <section className={styles.section}>
            <h2>8. Disponibilidade do site</h2>
            <p>
              A Porto Talent busca manter o site disponível e seguro, mas não garante funcionamento ininterrupto,
              ausência de erros, compatibilidade com todos os dispositivos ou disponibilidade permanente dos
              formulários.
            </p>
          </section>

          <section className={styles.section}>
            <h2>9. Privacidade e proteção de dados</h2>
            <p>
              O tratamento de dados pessoais segue a{' '}
              <Link href="#politica-de-privacidade">Política de Privacidade e Proteção de Dados Pessoais</Link>, que
              integra estes termos.
            </p>
          </section>

          <section className={styles.section}>
            <h2>10. Alterações destes termos</h2>
            <p>
              Estes termos podem ser atualizados a qualquer momento para refletir mudanças no site, nos serviços, na
              legislação ou em processos internos. A versão vigente será sempre publicada nesta página.
            </p>
          </section>

          <section className={styles.section}>
            <h2>11. Foro e legislação aplicável</h2>
            <p>
              Estes termos são regidos pelas leis brasileiras. Eventuais controvérsias serão tratadas preferencialmente
              por contato direto com a Porto Talent e, se necessário, pelos meios legais competentes.
            </p>
          </section>

          <section className={styles.section} id="politica-de-privacidade">
            <h2>Política de Privacidade e Proteção de Dados Pessoais</h2>
            <p>
              A Porto Talent Consultoria e Recrutamento, inscrita no CNPJ nº 63.164.361/0001-93, respeita a privacidade
              e a proteção dos dados pessoais de seus candidatos, clientes, parceiros e usuários. Esta Política de
              Privacidade foi elaborada em conformidade com a Lei nº 13.709/2018 (LGPD).
            </p>

            <h3>1. Quem somos</h3>
            <p>
              A Porto Talent atua na prestação de serviços de recrutamento, seleção, avaliação de perfil profissional,
              treinamento e consultoria de recursos humanos.
            </p>

            <h3>2. Dados pessoais coletados</h3>
            <ul>
              <li>Nome completo, CPF, RG, data de nascimento e endereço;</li>
              <li>Telefone, WhatsApp e e-mail;</li>
              <li>Currículo, histórico profissional, formação acadêmica e certificações;</li>
              <li>Informações fornecidas em entrevistas e processos seletivos;</li>
              <li>Dados de navegação quando houver acesso ao site.</li>
            </ul>

            <h3>3. Finalidades do tratamento</h3>
            <ul>
              <li>Realização de processos seletivos;</li>
              <li>Formação de banco de talentos;</li>
              <li>Encaminhamento para vagas compatíveis;</li>
              <li>Contato sobre oportunidades profissionais;</li>
              <li>Cumprimento de obrigações legais e regulatórias.</li>
            </ul>

            <h3>4. Bases legais</h3>
            <p>
              O tratamento dos dados ocorre com base no consentimento do titular, execução contratual, cumprimento de
              obrigação legal, legítimo interesse e demais hipóteses previstas na LGPD.
            </p>

            <h3>5. Compartilhamento de dados</h3>
            <p>
              Os dados poderão ser compartilhados com empresas contratantes, fornecedores de tecnologia e autoridades
              competentes quando exigido por lei. A Porto Talent não comercializa dados pessoais.
            </p>

            <h3>6. Banco de talentos</h3>
            <p>
              Os currículos poderão permanecer em banco de talentos para futuras oportunidades, podendo o titular
              solicitar sua exclusão a qualquer momento.
            </p>

            <h3>7. Cookies</h3>
            <p>O site poderá utilizar cookies para melhorar a experiência do usuário e gerar estatísticas de acesso.</p>

            <h3>8. Segurança dos dados</h3>
            <p>
              São adotadas medidas técnicas e administrativas para proteção contra acessos não autorizados, perdas,
              alterações ou divulgações indevidas.
            </p>

            <h3>9. Prazo de retenção</h3>
            <p>
              Os dados serão mantidos pelo período necessário para cumprir as finalidades desta política e exigências
              legais.
            </p>

            <h3>10. Direitos dos titulares</h3>
            <p>
              O titular poderá solicitar acesso, correção, exclusão, portabilidade, revogação do consentimento e demais
              direitos previstos na LGPD.
            </p>

            <h3>11. Canal de atendimento</h3>
            <p>Porto Talent Consultoria e Recrutamento</p>
            <p>CNPJ: 63.164.361/0001-93</p>

            <h3>12. Alterações da política</h3>
            <p>Esta política poderá ser atualizada periodicamente para adequação legal e operacional.</p>

            <h3>Declaração de consentimento</h3>
            <p>
              Ao enviar seu currículo ou utilizar os serviços da Porto Talent, o titular declara estar ciente e concordar
              com os termos desta Política de Privacidade.
            </p>
          </section>

          <section className={styles.contactBox}>
            <h2>Contato</h2>
            <p>
              E-mail: <a href="mailto:contato@portotalent.com.br">contato@portotalent.com.br</a>
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
