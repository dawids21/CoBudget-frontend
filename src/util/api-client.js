import backend from "../config/backend";

class ApiClient {
  constructor(accessToken) {
    this.accessToken = accessToken;
    this.backendUrl = backend.url;
  }

  getEntries = async (start, end) => {
    const response = await fetch(
      `${this.backendUrl}api/entry?` +
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
    const response = await fetch(`${this.backendUrl}api/category/all`, {
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

  addEntry = async (entry) => {
    const response = await fetch(`${this.backendUrl}api/entry`, {
      method: "POST",
      body: JSON.stringify(entry),
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
  };

  addCategory = async (category) => {
    const response = await fetch(`${this.backendUrl}api/category`, {
      method: "POST",
      body: JSON.stringify(category),
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    return await response.json();
  };

  deleteCategory = async (category) => {
    const response = await fetch(
      `${this.backendUrl}api/category/${category.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
  };

  getPlan = async (date) => {
    const response = await fetch(
      `${this.backendUrl}api/plan?` +
        new URLSearchParams({
          date: date.toISOString().split("T")[0],
        }),
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      }
    );
    if (!response.ok) {
      if (response.status === 400) {
        return null;
      }
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

  createPlan = async (date) => {
    const response = await fetch(`${this.backendUrl}api/plan`, {
      method: "POST",
      body: JSON.stringify({ date: date.toISOString().split("T")[0] }),
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
  };

  planCategory = async (categoryId, planId, amount) => {
    const response = await fetch(
      `${this.backendUrl}api/plan/${planId}/category/${categoryId}?` +
        new URLSearchParams({ amount }),
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
  };
}

export default ApiClient;
