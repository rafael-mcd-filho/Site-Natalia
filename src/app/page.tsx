import Header from '@/components/Header'
import Hero from '@/components/Hero'
import HeroStatsStrip from '@/components/HeroStatsStrip'
import SectionDor from '@/components/SectionDor'
import SectionProposta from '@/components/SectionProposta'
import SectionServicos from '@/components/SectionServicos'
import SectionProcesso from '@/components/SectionProcesso'
import SectionDiferenciais from '@/components/SectionDiferenciais'
import SectionProvasSocial from '@/components/SectionProvasSocial'
import SectionCTAEmpresa from '@/components/SectionCTAEmpresa'
import SectionAreaCandidato from '@/components/SectionAreaCandidato'
import SectionFAQ from '@/components/SectionFAQ'
import SectionCTAFinal from '@/components/SectionCTAFinal'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import RevealObserver from '@/components/RevealObserver'
import SectionConnector from '@/components/SectionConnector'

export default function Home() {
  return (
    <>
      <RevealObserver />
      <Header />
      <main>
        {/* Hero: bege */}
        <Hero />
        <HeroStatsStrip />
        {/* bege → white */}
        <SectionConnector from="bege" to="white" />
        <SectionDor />
        {/* white → white */}
        <SectionConnector from="white" to="white" />
        <SectionProposta />
        {/* white → bege-creme */}
        <SectionConnector from="white" to="bege-creme" />
        <SectionServicos />
        {/* bege-creme → white */}
        <SectionConnector from="bege-creme" to="white" />
        <SectionProcesso />
        {/* white → bege */}
        <SectionConnector from="white" to="bege" />
        <SectionDiferenciais />
        {/* bege → white */}
        <SectionConnector from="bege" to="white" />
        <SectionProvasSocial />
        {/* white → preto: forte contraste, sem conector */}
        <SectionCTAEmpresa />
        {/* preto → bege-quente: divisor "CANDIDATOS" já faz a transição */}
        <SectionAreaCandidato />
        {/* bege-quente → white */}
        <SectionConnector from="bege-quente" to="white" />
        <SectionFAQ />
        {/* white → bege */}
        <SectionConnector from="white" to="bege" />
        <SectionCTAFinal />
        {/* bege → preto: contraste define, sem conector */}
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
