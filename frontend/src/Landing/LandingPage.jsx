import React from 'react'
import Nav from './Nav'
import Hero from './Hero'
import InfoSections from './InfoSection'
import Features from './Features'
import CallToAction from './CallToAction'
import Footer from './Footer'

function LandingPage() {
  return (
    <div>
        <Nav/>
        <Hero/>
        <InfoSections/>
        <Features/>
        <CallToAction/>
        <Footer/>
    </div>
  )
}

export default LandingPage