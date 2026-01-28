const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getAllCategories() {
  try {
    const response = await fetch(`${API_URL}/categories`);
    const data = await response.json();
    return data
  } catch (error) {
    console.log(error);
  }
}

// export async function getSubCategories() {
//   try {
//     const response = await fetch(`${API_URL}/subcategories`);
//     const data = await response.json();
//     return data
//   } catch (error) {
//     console.log(error);
//   }
// }