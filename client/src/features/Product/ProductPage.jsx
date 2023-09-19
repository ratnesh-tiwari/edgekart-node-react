import Heading from '../../ui/Heading';

const product = {
  id: '6501d5688088886f2436c9dd',
  name: 'DKNY Unisex Black & Grey Printed Medium Trolley Bag',
  description:
    'Black and grey printed medium trolley bag, secured with a TSA lockOne handle on the top and one on the side, has a trolley with a retractable handle on the top and four corner mounted inline skate wheelsOne main zip compartment, zip lining, two compression straps with click clasps, one zip compartment on the flap with three zip pocketsWarranty: 5 yearsWarranty provided by Brand Owner / Manufacturer',
  price: 11745,
  images: [
    'http://assets.myntassets.com/assets/images/10017413/2020/3/6/0896e133-7c7c-4bca-a6a9-e58de74515211583495685498DKNYUnisexBlackGreyPrintedMediumTrolleyBag1.jpg',
    'http://assets.myntassets.com/assets/images/10017413/2020/3/6/7cfd6b92-5b81-4ea1-940f-9f881f830f261583495685583DKNYUnisexBlackGreyPrintedMediumTrolleyBag2.jpg',
    'http://assets.myntassets.com/assets/images/10017413/2020/3/6/40f5febb-c807-49d4-9e98-55b6ec43fdd81583495685652DKNYUnisexBlackGreyPrintedMediumTrolleyBag3.jpg',
    'http://assets.myntassets.com/assets/images/10017413/2020/3/6/3398a3d6-f65d-4df6-b203-1f5a899e63791583495685728DKNYUnisexBlackGreyPrintedMediumTrolleyBag4.jpg',
  ],
  discount: 116,
  ratingAverage: 0,
  numReviews: 0,
  category: 'fashion',
  brand: 'DKNY',
  stock: 715,
  gender: 'Unisex',
};

function ProductPage() {
  const {
    id,
    name,
    images,
    description,
    price,
    discount,
    ratingAverage,
    numReviews,
    category,
    brand,
    stock,
    gender,
  } = product;
  return (
    <>
      <Heading as="h2">{name}</Heading>
    </>
  );
}

export default ProductPage;
