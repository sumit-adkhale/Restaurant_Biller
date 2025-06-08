import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Other Components/Loading";
import { fetchFoodDetails, tempCart } from "../../Store/Slice";

function Menu({ newCol }) {
  const [SearchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFoodDetails());
  }, [dispatch]);

  const { foodDetails, foodLoading, tempCartDetails } = useSelector(
    (state) => state.restaurant
  );

  const tempId = tempCartDetails.map((data) => data.id);
  return (
    <>
      <div className="shadow-md rounded-lg p-6">
        <div className="flex justify-between">
          <form>
            <div className="flex mb-4">
              <input
                type="text"
                className="w-full bg-transparent px-4 py-2 mr-2 rounded-lg
                         border-gray-300 border-2 focus:outline-none
                          focus:border-blue-500"
                placeholder="Search Food Items"
                required
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
          </form>
        </div>

        <div className="w-[100%] mx-auto my-6 py-5 px-8 bg-zinc-800 rounded-xl shadow-md shadow-orange-300">
          <h1 className="text-3xl font-semibold text-center my-5">Food Menu</h1>

          {foodLoading && <Loading />}
          {!foodLoading && (
            <table className="w-full text-center">
              <thead className=" border-b-2 pb-2 my-4">
                <tr className="font-semibold py-4">
                  <td className="px-6 py-2">Sr No.</td>
                  <td>Food Items Name</td>
                  <td>Veg / Non Veg</td>
                  <td>cusine</td>
                  <td>Price (Rs./₹)</td>
                  {newCol && <td>Action</td>}
                </tr>
              </thead>

              <tbody className=" gap-2 my-2">
                {foodDetails
                  .filter((value) => {
                    if (SearchText === "") {
                      return value;
                    } else if (
                      value.foodName
                        .toLowerCase()
                        .includes(SearchText.toLowerCase())
                    ) {
                      return value;
                    }
                  })
                  .map((food, index) => {
                    const isAdded = tempId.includes(food.id); // ✅ Check if item is already added

                    return (
                      <tr key={index} className="border-b-1 pb-2 px-8 mb-2">
                        <td className="px-6 py-2">{index + 1}</td>
                        <td>{food.foodName}</td>
                        <td> {food.type} </td>
                        <td> {food.cusine} </td>
                        <td className="pr-10"> {food.price} </td>
                        <td>
                          {newCol && (
                            <button
                              onClick={() => dispatch(tempCart(food.id))}
                              className={`px-2 rounded cursor-pointer ${
                                isAdded
                                  ? "bg-gray-500 cursor-not-allowed"
                                  : "bg-blue-700"
                              }`}
                              disabled={isAdded} // ✅ Disable button if item is already in tempCartDetails
                            >
                              {isAdded ? "Added" : "Add"}
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}

export default Menu;
