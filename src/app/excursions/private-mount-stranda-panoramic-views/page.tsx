import { ExcursionDetailPage } from "@/components/excursion-detail-page";
import { privateMountStrandaPanoramicViewsExcursion } from "@/lib/excursions/private-mount-stranda-panoramic-views";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata = buildPageMetadata({
  title: privateMountStrandaPanoramicViewsExcursion.metaTitle,
  description: privateMountStrandaPanoramicViewsExcursion.metaDescription,
  path: privateMountStrandaPanoramicViewsExcursion.path,
  ogImage: privateMountStrandaPanoramicViewsExcursion.heroImage,
  ogImageAlt: privateMountStrandaPanoramicViewsExcursion.heroImageAlt,
});

export default function Page() {
  return (
    <ExcursionDetailPage
      excursion={privateMountStrandaPanoramicViewsExcursion}
    />
  );
}
