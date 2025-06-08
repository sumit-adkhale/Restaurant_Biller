import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const port = import.meta.env.VITE_PORT

const initialState = {
  users: [],
  admin: [],
  tableDetails: [],
  foodDetails: [],
  takeAwayDetails:[],
  allDiningDetails:[],
  tempCartDetails: [],
  tempKOT: [],
  targets:[],
  usersLoding: true,
  foodLoading: true,
  tableLoading: true,
  takeAwayLoading: true,
  diningLoading:true,
  targetLoading:true,
  userStatus: "",
  adminStatus: "",
  tableStatus: "",
  addTableStatus: "",
  foodStatus: "",
  takeAwayStatus: "",
  diningStatus: "",
  targetStatus: "",
  userError: null,
  adminError: null,
  tableError: null,
  foodError: null,
};

//fetch call user
export const fetchUser = createAsyncThunk(
  "users/fetchuser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${port}/user`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Add Users
export const addUser = createAsyncThunk(
  "users/addUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${port}/user`,userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
// Add Users
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${port}/user/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
// Edit Users
export const editOneUser = createAsyncThunk(
  "users/editOneUser",
  async ({id,data },{ rejectWithValue }) => {
    try {
      const response = await axios.put(`${port}/user/${id}`,data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

//fetch call admin
export const fetchAdmin = createAsyncThunk(
  "admin/fetchadmin",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${port}/admin`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

//fetch call TableDetails
export const fetchTableDetails = createAsyncThunk(
  "tableDetails/fetchtabledetails",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${port}/TableDetails`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

//addTables data
export const addTable = createAsyncThunk(
  "tableDetails/addTableDetails",
  async (tableData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${port}/TableDetails`,
        tableData
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

//deleteTable data
export const deleteTable = createAsyncThunk(
  "tableDetails/deleteTableDetails",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(
        `${port}/TableDetails/${id}`
      );
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

//FetchOneTable data
export const FetchOneTable = createAsyncThunk(
  "tableDetails/FetchOneTableDetails",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${port}/TableDetails/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

//update Table data
export const updateTable = createAsyncThunk(
  "tableDetails/updateTableDetails",
  async ({ id, ...updatedData }) => {
    try {
      const res = await axios.put(
        `${port}/TableDetails/${id}`,
        updatedData
      );
      return res.data; // ✅ Ensure data is returned
    } catch (err) {
      console.error("Error updating table:", err);
      throw err;
    }
  }
);

//fetch call FoodDetails
export const fetchFoodDetails = createAsyncThunk(
  "foodDetails/fetchfooddetails",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${port}/FoodDetails`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

//add food Data
export const addFood = createAsyncThunk(
  "foodDetails/addFoodDetails",
  async (foodData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${port}/FoodDetails`,
        foodData
      );
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

//Delete Food data
export const deleteFood = createAsyncThunk(
  "foodDetails/deleteFoodDetails",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${port}/FoodDetails/${id}`);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

//FetchOneTable data
export const FetchOneFood = createAsyncThunk(
  "tableDetails/FetchOneFoodDetails",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${port}/FoodDetails/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

//update Food data
export const updateFood = createAsyncThunk(
  "tableDetails/updateFoodDetails",
  async ({ id, ...updatedData }) => {
    try {
      const res = await axios.put(
        `${port}/FoodDetails/${id}`,
        updatedData
      );
      return res.data; // ✅ Ensure data is returned
    } catch (err) {
      console.error("Error updating table:", err);
      throw err;
    }
  }
);

//Fetch TakeAway Details
export const fetchTakeAwayDetails = createAsyncThunk(
  "takeAwayDetails/fetchTakeAwayDetails",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${port}/TakeAway`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

//Update TakeAway Details
export const updateTakeAwayDetails = createAsyncThunk(
  "takeAwayDetails/updateTakeAwayDetails",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${port}/TakeAway`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
//Fetch Single TakeAway Details
export const fetchOneTakeAwayDetails = createAsyncThunk(
  "takeAwayDetails/fetchOneTakeAwayDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${port}/TakeAway/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
//Update Single TakeAway Details
export const updateOneTakeAwayDetails = createAsyncThunk(
  "takeAwayDetails/fetchOneTakeAwayDetails",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${port}/TakeAway/${id}`,
        updatedData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

//Add KOT Details
export const addKOT = createAsyncThunk(
  "KOT/addKOT",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${port}/KOT`, data)
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

//Fetch one KOT
export const FetchKOT = createAsyncThunk(
  "KOT/FetchOneKOT",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${port}/KOT/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

//delete KOT
export const removeKOT = createAsyncThunk(
  "KOT/removeKOT",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${port}/KOT/${id}`);
      console.log(id);

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

//Update Single Dining Table
export const updateOneDining = createAsyncThunk(
  "takeAwayDetails/fetchOneTakeAwayDetails",
  async ({ id, updatedData }, { rejectWithValue }) => {
    
    try {
      const response = await axios.put(
        `${port}/TableDetails/${id}`,
        updatedData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

//Fetch Single Dining
export const fetchOneDining = createAsyncThunk(
  "takeAwayDetails/fetchOneDining",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${port}/TableDetails/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
//Add Dining KOT Details
export const addDiningKOT = createAsyncThunk(
  "KOT/addKOT",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${port}/DiningKOT`, data)
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

//Fetch one Dining KOT
export const FetchDiningKOT = createAsyncThunk(
  "KOT/FetchOneKOT",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${port}/DiningKOT/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

//delete Dining KOT
export const removeDiningKOT = createAsyncThunk(
  "KOT/removeKOT",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${port}/DiningKOT/${id}`);
      console.log(id);

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

//Add All Dining Details
export const addAllDining = createAsyncThunk(
  "Dining/addAllDining",
  async (updateId, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${port}/AllDinings`, updateId)
      return res.data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

//Fetch All Dining Details
export const fetchAllDining = createAsyncThunk(
  "Dining/FetchAllDining",
  async ( _,{ rejectWithValue }) => {
    try {
      const res = await axios.get(`${port}/AllDinings`)
      return res.data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

//Fetch Single Dining
export const fetchOneDiningFromAll = createAsyncThunk(
  "allDining/fetchOneDiningFromAll",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${port}/AllDinings/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

//Fetch Targets
export const fetchTargets = createAsyncThunk(
  "targets/fetchTargets",
  async ( _,{ rejectWithValue }) => {
    try {
      const response = await axios.get(`${port}/Targets`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

//Modify Targets
export const modifyTargets = createAsyncThunk(
  "targets/modifyTargets",
  async ( data,{ rejectWithValue }) => {
    try {
      const response = await axios.post(`${port}/Targets`,data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const mySlice = createSlice({
  name: "restaurant",
  initialState: initialState,
  reducers: {
    tempCart: (state, action) => {
      const foodId = action.payload;
      const existingItem = state.tempCartDetails.find(
        (item) => item.id === foodId
      );

      if (!existingItem) {
        const foodItem = state.foodDetails.find((food) => food.id === foodId);
        if (foodItem) {
          state.tempCartDetails.push({
            ...foodItem,
            quantity: 1, // Set default quantity to 1 when adding
          });
          state.tempKOT.push({
            ...foodItem,
            quantity: 1, // Set default quantity to 1 when adding
          });
        }
      }
    },
    removeTempItem: (state, action) => {
      const newTempCart = state.tempCartDetails.filter(
        (item) => item.id !== action.payload
      );
      state.tempCartDetails = newTempCart;
    },
    emptyTempCart: (state, action) => {
      state.tempCartDetails = [];
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      
      // Find the item in tempCartDetails
      const existingItem = state.tempCartDetails.find(food => food.id === id);
      if (existingItem) {
        const previousQuantity = existingItem.quantity;
        const newQuantity = quantity > 0 ? quantity : 1;
    
        // Update tempCartDetails quantity
        existingItem.quantity = newQuantity;
    
        // Check if the quantity is increased
        if (newQuantity > previousQuantity) {
          const extraQuantity = newQuantity - previousQuantity;
    
          // Find if the item already exists in tempKOT
          const existingKOTItem = state.tempKOT.find(food => food.id === id);
          if (existingKOTItem) {
            existingKOTItem.quantity += extraQuantity; // Add only extra quantity
          } else {
            state.tempKOT.push({ ...existingItem, quantity: extraQuantity });
          }
        }
      }
    }
    ,
    updateTempCart: (state, action) => {
      const orderItems = action.payload; // Assuming order is an array of food items
      state.tempCartDetails = orderItems.map((item) => ({
        ...item,
        quantity: item.quantity || 1, // Ensure each item has a quantity
      }));
    },

    
  },
  extraReducers: (builder) => {
    //User Data
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.userStatus = "succeeded";
        state.usersLoding = false;
        state.users = action.payload;
      })
      .addCase(fetchUser.pending, (state, action) => {
        state.userStatus = "loading";
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.userStatus = "failed";
        state.error = action.error.message;
      })
      //Admin data
      .addCase(fetchAdmin.fulfilled, (state, action) => {
        state.adminStatus = "succeeded";
        state.admin = action.payload;
      })
      .addCase(fetchAdmin.pending, (state, action) => {
        state.adminStatus = "loading";
      })
      .addCase(fetchAdmin.rejected, (state, action) => {
        state.adminStatus = "failed";
        state.error = action.error.message;
      })
      //Table Data
      .addCase(fetchTableDetails.fulfilled, (state, action) => {
        state.tableStatus = "succeeded";
        state.tableLoading = false;
        state.tableDetails = action.payload;
      })
      .addCase(fetchTableDetails.pending, (state, action) => {
        state.tableStatus = "loading";
      })
      .addCase(fetchTableDetails.rejected, (state, action) => {
        state.tableStatus = "failed";
        state.error = action.error.message;
      })
      //FoodDetails
      .addCase(fetchFoodDetails.fulfilled, (state, action) => {
        state.foodStatus = "succeeded";
        state.foodLoading = false;
        state.foodDetails = action.payload;
      })
      .addCase(fetchFoodDetails.pending, (state, action) => {
        state.foodStatus = "loading";
      })
      .addCase(fetchFoodDetails.rejected, (state, action) => {
        state.foodStatus = "failed";
        state.error = action.error.message;
      })
      //addTable
      .addCase(addTable.fulfilled, (state, action) => {
        state.addTableStatus = "succeeded";
        state.addTable = action.payload;
      })
      .addCase(addTable.pending, (state, action) => {
        state.addTableStatus = "loading";
      })
      .addCase(addTable.rejected, (state, action) => {
        state.addTableStatus = "failed";
        state.error = action.error.message;
      })
      //TakeAwayDetails
      .addCase(fetchTakeAwayDetails.fulfilled, (state, action) => {
        state.takeAwayStatus = "succeeded";
        state.takeAwayLoading = false;
        state.takeAwayDetails = action.payload;
      })
      .addCase(fetchTakeAwayDetails.pending, (state, action) => {
        state.takeAwayStatus = "loading";
      })
      .addCase(fetchTakeAwayDetails.rejected, (state, action) => {
        state.takeAwayStatus = "failed";
        state.error = action.error.message;
      })
      //Dinings
      .addCase(fetchAllDining.fulfilled, (state, action) => {
        state.diningStatus = "succeeded";
        state.diningLoading = false;
        state.allDiningDetails = action.payload;
      })
      .addCase(fetchAllDining.pending, (state, action) => {
        state.diningStatus = "loading";
      })
      .addCase(fetchAllDining.rejected, (state, action) => {
        state.diningStatus = "failed";
        state.error = action.error.message;
      })
      //targets
      .addCase(fetchTargets.fulfilled, (state, action) => {
        state.targetStatus = "succeeded";
        state.targetLoading = false;
        state.targets = action.payload;
      })
      .addCase(fetchTargets.pending, (state, action) => {
        state.targetStatus = "loading";
      })
      .addCase(fetchTargets.rejected, (state, action) => {
        state.targetStatus = "failed";
        state.error = action.error.message;
      })
  },
});

export const { tempCart, removeTempItem, emptyTempCart, updateQuantity, updateTempCart } =
  mySlice.actions;
export default mySlice.reducer;
