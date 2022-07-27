class ApiClient {
  constructor(accessToken) {
    this.accessToken = accessToken;
  }

  getEntries = async (start, end) => {
    const response = await fetch(
      "http://localhost:8080/api/entry?" +
        new URLSearchParams({
          from: start.toISOString().split("T")[0],
          to: end.toISOString().split("T")[0],
        }),
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    let data;
    try {
      data = await response.json();
    } catch (e) {
      throw new Error(e.message);
    }

    const entriesData = data.map((item) => ({
      id: item.id,
      amount: item.amount,
      date: new Date(item.date),
      category:
        item.category !== null
          ? `${item.category} - ${item.subcategory}`
          : item.subcategory,
    }));
    return entriesData;
  };

  getCategories = async () => {
    const response = await fetch("http://localhost:8080/api/category/all", {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    let data;
    try {
      data = await response.json();
    } catch (e) {
      throw new Error(e.message);
    }

    return data;
  };
}

export default ApiClient;
