import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box } from '@mui/material'
import styles from '../../styles'
import ShowMore from '../Common/ShowMore'
import Markdown from '../Common/Markdown'
import { Locales } from '../../types'

const helloMessages = {
  title: {
    fi: '## Tervetuloa Curreen',
    sv: '## Välkommen till Curre', 
    en: '## Tervetuloa Curreen',
  },
  text: {
    fi: '### Curre auttaa sinua digipedagogisissa valinnoissa. Voit käyttää Currea tukena kun haluat ideoida uusia mahdollisuuksia hyödyntää digitalisaatiota osana opetusta ja oppimista kurssillasi. Sinun ei tarvitse etukäteen tietää millaista ohjelmistoa tai digitaalista alustaa on etsimässä, täytä muutama ennakkotieto kurssiisi liittyen ja anna Curren hoitaa loput!  \n \nCurre kuratoi Helsingin yliopiston digipedagogisen palvelutarjonnan opetuksesi tueksi. Curre on Digitaalisen opetuksen ja jatkuvan oppimisen palveluiden (DOJO) lahja opettajille [opetuksen juhlavuonna 2023.](https://www.helsinki.fi/fi/hakeminen-ja-opetus/opetus/opetuksen-juhlavuosi-2022-2023) Curren sisältöjä kehitetään jatkuvasti käyttäjäpalautteen pohjalta.  \n \nCurren ohella [tarjoamme edelleen koulutusta](https://flamma.helsinki.fi/fi/group/opetuksen-tuki/opetusteknologiakoulutus) opettajille Helsingin yliopiston virallisesti tuetuista digiopetuksen välineistä.  \nTorstaisin järjestämme [Digipedakahvilan](https://flamma.helsinki.fi/fi/group/ajankohtaista/uutinen/-/uutinen/digipedakahvila-torstaisin-zoomissa---tule-kysymaan-kuulemaanvinkkejaja-vaihtamaan-kuulumisia-opetukseen-liittyen/24122898) Zoomin välityksellä, tervetuloa mukaan!  \n \n[Kerrothan mielipiteesi Curresta lyhyen palautelomakkeen muodossa.](https://forms.office.com/e/TWvNdLb48z)',
    sv: '### Curre hjälper dig med digipedagogiska val. Man kan använda Curre som stöd för att bolla nya idéer över hur man kan utnyttja digitalisering som en del av undervisningen och lärandet på kursen. Du behöver inte på förväg veta vilken typ av program – eller digital plattform du är ute efter. Fyll i några förhandsuppgifter angående kursen och låt Curre sköta resten! \n \n  Curre filtrerar Helsingfors universitets digipedagogiska tjänsteutbud, för att stödja din undervisning. Curre är en present av tjänster för digital undervisning och kontinuerligt lärande (DOJO) till lärarna [undervisningens år 2023.]( https://www.helsinki.fi/sv/utbildning-och-undervisning/undervisning/undervisningens-ar-2022-2023). Curres innehåll utvecklas ständigt baserat på feedback från användare. \n \n Utöver Curre [erbjuder vi ännu utbildning]( https://flamma.helsinki.fi/sv/group/opetuksen-tuki/undervisningsteknologiservicens-kurser) för lärare i digitala hjälpmedel som officiellt stödjs av Helsingfors Universitet. \n På torsdagar ordnar vi [Digipeda-cafét]( https://flamma.helsinki.fi/sv/group/ajankohtaista/nyhet/-/uutinen/digipedakahvila-torstaisin-zoomissa---tule-kysymaan-kuulemaanvinkkejaja-vaihtamaan-kuulumisia-opetukseen-liittyen/24122898) via Zoom, välkommen med!   \n \n  [Ge gärna din åsikt om Curre, via det korta feedbackformuläret.](https://forms.office.com/e/TWvNdLb48z)', 
    en: '### Curre auttaa opettajaa digipedagogisissa valinnoissa. Voit käyttää Currea tukena kun haluat ideoida uusia mahdollisuuksia hyödyntää digitalisaatiota osana opetusta ja oppimista kurssillasi.',
  },
}
const HelloBanner = () => {
  const { i18n } = useTranslation()
  const { language } = i18n

  const { cardStyles } = styles

  return (
    <Box id="hello-component" sx={cardStyles.helloBox}>
      <Box sx={cardStyles.expendableBox}>
        <Markdown>{helloMessages.title[language as keyof Locales]}</Markdown>
        <ShowMore
          text={helloMessages.text[language as keyof Locales]}
          expanded
        />
      </Box>
    </Box>
  )
}

export default HelloBanner
