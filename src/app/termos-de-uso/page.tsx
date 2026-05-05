import type { Metadata } from 'next'
import Link from 'next/link'
import { createMetadata } from '@/lib/seo'
import styles from '../legal.module.css'

export const metadata: Metadata = createMetadata({
  title: 'Termos de Uso | Porto Talent',
  description: 'Condições de uso do site e dos formulários da Porto Talent.',
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
        <p className={styles.updated}>Última atualização: 5 de maio de 2026.</p>

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
              O tratamento de dados pessoais segue a nossa{' '}
              <Link href="/politica-de-privacidade">Política de Privacidade</Link>, que integra estes termos.
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
