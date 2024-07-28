interface ICategory {
  id: string;
  slug: string;
  name: string;
  url: string;
}

interface IProduct {
  id: number;
  title: string;
  name: string;
  price: number;
  category: string;
  brand: string;
}

type TSelectedValue = {
  isMultiple: boolean;
  value: string | string[];
};

type TSelectOptions = { id: string | number; name: string }

export type { ICategory, IProduct, TSelectedValue, TSelectOptions };
