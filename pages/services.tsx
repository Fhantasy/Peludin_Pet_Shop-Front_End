import Head from "next/head";
import styles from "../styles/services.module.scss";
import Header from "@/src/components/commons/header";
import { Container } from "reactstrap";
import Footer from "@/src/components/commons/footer";
import Link from "next/link";

export default function Services() {
  return (
    <>
      <Head>
        <title>Peludin - Servicos</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Changa:wght@500&family=Chango&display=swap"
          rel="stylesheet"
        />
      </Head>
      <main>
        <Header />
        <Container>
          <div className={styles.showerDiv}>
            <div className={styles.infosDiv}>
              <p className={styles.title}>BANHO</p>
              <p className={styles.description}>
                Damos banho no seu pet com varios tipos de produtos para deixar
                o pelo macio e hidratado, livre de parasitas.
              </p>
              <p className={styles.subtitle}>TIPOS DE BANHO:</p>
              <ul>
                <li className={styles.typeTitle}>Suave</li>
                <ul>
                  <li className={styles.typeDescription}>
                    Shampoo e condicionador para pelos sensiveis e cuidado extra
                    com os pelos
                  </li>
                </ul>

                <li className={styles.typeTitle}>Normal</li>
                <ul>
                  <li className={styles.typeDescription}>
                    Banho com shampoo e condicionador e tratamento dos pelos
                  </li>
                </ul>

                <li className={styles.typeTitle}>Pesado</li>
                <ul>
                  <li className={styles.typeDescription}>
                    Banho com shampoo e condicionador para raças grandes e muito
                    peludas que exigem um cuidado extra
                  </li>
                </ul>
              </ul>
            </div>
            <img
              src="/services/dog_shower.jpg"
              alt="dogShower"
              className={styles.img}
            />
          </div>

          <div className={styles.gridDiv}>
            <div className={styles.tosaGrid}>
              <div className={styles.contentDiv}>
                <div className={styles.infosDiv}>
                  <p className={styles.title}>TOSA</p>
                  <p className={styles.description}>
                    Tosa com profissionais especializados e com varios estilos
                    diferentes de pelos, desde o pelo mais forte e grande ao
                    menor e delicado.
                  </p>
                  <p className={styles.subtitle}>TIPOS DE TOSA:</p>
                  <ul>
                    <li className={styles.typeTitle}>Francesa</li>
                    <ul>
                      <li className={styles.typeDescription}>
                        Tosa feita com tecnicas francesas deixando o pelo
                        alinhado em um alinhamento redondo.
                      </li>
                      <img
                        src="/services/tosa-francesa.webp"
                        alt="tosaFrancesa"
                        className={styles.tosaImg}
                      />
                    </ul>

                    <li className={styles.typeTitle}>Emo</li>
                    <ul>
                      <li className={styles.typeDescription}>
                        Tosa para deixar o seu pet super emo dark trevoso com um
                        estilo das trevas trevosas
                      </li>
                      <img
                        src="/services/tosa-emo.webp"
                        alt="tosaFrancesa"
                        className={styles.tosaImg}
                      />
                    </ul>

                    <li className={styles.typeTitle}>Algodão doce</li>
                    <ul>
                      <li className={styles.typeDescription}>
                        Tosa para deixar seu doce pet fofinho e redondinho igual
                        a um algodão doce.
                      </li>
                      <img
                        src="/services/tosa-algodao_doce.webp"
                        alt="tosaFrancesa"
                        className={styles.tosaImg}
                      />
                    </ul>

                    <li className={styles.typeTitle}>Leão</li>
                    <ul>
                      <li className={styles.typeDescription}>
                        Tosa para deixar seu pet magnifico e exuberante igual ao
                        rei da selva
                      </li>
                      <img
                        src="/services/tosa-leao.jpg"
                        alt="tosaFrancesa"
                        className={styles.tosaImg}
                      />
                    </ul>
                  </ul>
                </div>
              </div>
            </div>
            <div className={styles.vetGrid}>
              <div className={styles.contentDiv}>
                <div className={styles.infosDiv}>
                  <p className={styles.title}>Veterinario</p>
                  <p className={styles.description}>
                    Temos serviço veterinario com o Dr Vete Rinario que atende
                    em horario comercial no Peludin Pet Shop, e 24 horas atravez
                    do numero (66) 11111-1111.
                  </p>
                  <p className={styles.subtitle}>TIPOS Atendimento:</p>
                  <ul>
                    <li className={styles.typeTitle}>
                      Tratamento de ferimentos e infecções
                    </li>
                    <ul>
                      <li className={styles.typeDescription}>
                        Se seu pet está machucado ou com infecções de qualquer
                        natureza venha nos procurar.
                      </li>
                    </ul>

                    <li className={styles.typeTitle}>Vacinas</li>
                    <ul>
                      <li className={styles.typeDescription}>
                        Aplicamos todas as vacinas periodicamente e com
                        carteirinha de vacinação
                      </li>
                    </ul>

                    <li className={styles.typeTitle}>Cirurgias</li>
                    <ul>
                      <li className={styles.typeDescription}>
                        Temos equipamentos de ponta pra fazer cirurcias de
                        pequeno e medio porte.
                      </li>
                    </ul>
                  </ul>
                  <div className="text-center">
                    <img
                      src="/services/veterinario.jpg"
                      alt="vet"
                      className={styles.vetImg}
                    />
                  </div>

                  <div className="text-center">
                    <p className={styles.subtitle}>Dr. Vete Rinario</p>
                    <img
                      src="/whatsapp.svg"
                      alt="whatss"
                      className={styles.vetWhatsImg}
                    />
                    <span>(66) 11111-1111</span>
                  </div>
                  <p></p>
                </div>
              </div>
            </div>
            <div className={styles.contactGrid}>
              <div className={`${styles.contentDiv} text-center`}>
                <p className={styles.contactDescription}>
                  Venha fazer uma visita e traga seu melhor amigo que com
                  certeza será tratado com muito amor a carinho.
                </p>
                <Link href="/about" style={{ textDecoration: "none" }}>
                  <p className={styles.about}>Saiba mais</p>
                </Link>
                <img
                  src="/LogoPeludin.png"
                  alt="logo"
                  className={styles.logoImg}
                />
                <br />
                <img
                  src="/whatsapp.svg"
                  alt="whatss"
                  className={styles.vetWhatsImg}
                />
                <span>(66) 22222-2222</span>
              </div>
            </div>
          </div>
        </Container>
        <Footer />
      </main>
    </>
  );
}
