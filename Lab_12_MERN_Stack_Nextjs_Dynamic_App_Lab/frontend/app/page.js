import HeroSlider from '../components/HeroSlider';
import Collections from '../components/Collections';
import ProductGrid from '../components/ProductGrid';
import HotDeal from '../components/HotDeal';
import BuyOnlineBanner from '../components/BuyOnlineBanner';
import LatestUpdates from '../components/LatestUpdates';
import PartnerLogos from '../components/PartnerLogos';

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <Collections />
      <ProductGrid />
      <HotDeal />
      <BuyOnlineBanner />
      <LatestUpdates />
      <PartnerLogos />
    </>
  );
}