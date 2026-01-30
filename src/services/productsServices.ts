const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getAllProducts() {
  try {
    const response = await fetch(`${API_URL}/products`,
      {cache:"force-cache"}
    );
    const data = await response.json();
    return data
  } catch (error) {
    console.log(error);
  }
}

export async function getSpecificProduct(id:string) {
  try {
    const response = await fetch(`${API_URL}/products/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
