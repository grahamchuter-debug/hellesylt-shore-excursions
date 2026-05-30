import { ExcursionDetailPage } from "@/components/excursion-detail-page";
import { mountStrandaPanoramicViewsExcursion } from "@/lib/excursions/mount-stranda-panoramic-views";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata = buildPageMetadata({
  title: mountStrandaPanoramicViewsExcursion.metaTitle,
  description: mountStrandaPanoramicViewsExcursion.metaDescription,
  path: mountStrandaPanoramicViewsExcursion.path,
  ogImage: mountStrandaPanoramicViewsExcursion.heroImage,
  ogImageAlt: mountStrandaPanoramicViewsExcursion.heroImageAlt,
});

export default function Page() {
  return (
    <ExcursionDetailPage excursion={mountStrandaPanoramicViewsExcursion} />
  );
}
