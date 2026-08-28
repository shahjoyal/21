import React, { useEffect } from 'react';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { FounderStory } from '../components/FounderStory';
import { HeritageCraftStory } from '../components/HeritageCraftStory';
import { MakingProcess } from '../components/MakingProcess';
import { Testimonials } from '../components/Testimonials';
import { OutletContextType } from './Layout';

export default function HomePage() {
  const ctx = useOutletContext<OutletContextType>();
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Support cross-page nav links that pass a target section id via router state,
  // e.g. navigating from /workshops to Home and then scrolling to #menu.
  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    if (state?.scrollTo) {
      const timer = window.setTimeout(() => scrollToSection(state.scrollTo!), 80);
      // Clear the state so refreshing / navigating back doesn't re-trigger it.
      navigate(location.pathname, { replace: true, state: {} });
      return () => window.clearTimeout(timer);
    }
  }, [location.state]);

  return (
    <>
      <Hero
        onExploreMenu={() => navigate('/shop')}
        onOpenWorkshops={() => navigate('/workshops')}
        language={ctx.language}
      />

      <WhyChooseUs language={ctx.language} />

      <HeritageCraftStory language={ctx.language} />

      <MakingProcess language={ctx.language} />

      <FounderStory language={ctx.language} />

      <Testimonials language={ctx.language} />
    </>
  );
}