import InfoBox from "./InfoBox";
import { Table } from "./Table";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const DashBoard = ({ menu, totalCustomers, totalOrders, totalSales }) => {
  const [status, setStatus] = useState(false);
  const [active, setActive] = useState(1);
  const [items, setItems] = useState([])

  useEffect(() => {
    const temp = async () => {
      const data = await getDocs(collection(db, "Table1"));
      const info = data.docs.map((doc) => ({ ...doc.data() }));

      info.length >= 1 ? setStatus(true) : setStatus(false);
      setItems(info);
    }
    temp()
  }, []);


  const clearCollection = async (path) => {
    const ref = collection(db, path);
    const snapshot = await getDocs(ref);
    const results = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    if(results.length!==0) {
      results.forEach(async (result) => {
        const docRef = doc(db, path, result.id);
        await deleteDoc(docRef);
      });
      setStatus(false);
      setItems([])
      toast.success('Order Cleared!')
    } else 
      toast.error('Order Empty!')

    
  };

  const handleClick = async (number) => {
    const table = "Table" + number;
    const data = await getDocs(collection(db, table));
    const info = data.docs.map((doc) => ({ ...doc.data() }));

    info.length >= 1 ? setStatus(true) : setStatus(false);
    setActive(number);
    setItems(info);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="h-1/3 w-full flex">
        <InfoBox title="Total Orders" info={totalOrders} />
        <InfoBox title="Total Sales" info={totalSales} />
        <InfoBox title="Total Products" info={menu.length} />
        <InfoBox title="Total Customers" info={totalCustomers} />
      </div>
      <div className="h-2/3 w-full flex">
        <div className="w-2/3 flex border-r">
          <div className="w-4/5 h-4/5 m-auto rounded-lg shadow-2xl border flex">
            <div className="w-2/5 px-4 py-2">
              <h1 className="text-3xl font-bold">Tables</h1>
              <ul className="my-4">
                <div
                  onClick={() => handleClick(1)}
                  className={`${
                    active == 1 && "bg-highlight"
                  } rounded-lg cursor-pointer`}
                >
                  <Table number={1} />
                </div>
                <div
                  onClick={() => handleClick(2)}
                  className={`${
                    active == 2 && "bg-highlight"
                  } rounded-lg cursor-pointer`}
                >
                  <Table number={2} />
                </div>
                <div
                  onClick={() => handleClick(3)}
                  className={`${
                    active == 3 && "bg-highlight"
                  } rounded-lg cursor-pointer`}
                >
                  <Table number={3} />
                </div>
                <div
                  onClick={() => handleClick(4)}
                  className={`${
                    active == 4 && "bg-highlight"
                  } rounded-lg cursor-pointer`}
                >
                  <Table number={4} />
                </div>
                <div
                  onClick={() => handleClick(5)}
                  className={`${
                    active == 5 && "bg-highlight"
                  } rounded-lg cursor-pointer`}
                >
                  <Table number={5} />
                </div>
              </ul>
              <button className="bg-highlight px-4 py-2 rounded-lg">
                Add Table
              </button>
            </div>
            <div className="w-3/5">
              <div className="px-4 py-2">
                <h1 className="text-xl font-semibold mb-2">
                  Status:
                  <span className="ml-2 font-normal text-base">
                    {status ? "Booked" : "Vacant"}
                  </span>
                </h1>
                <div>
                  {items.map((item, ind) => (
                    <div key={ind} className="flex w-60 justify-between">
                      <div>
                        <h1 className="text-lg">{item.name}</h1>
                        <h3 className="text-xs font-semibold">
                          Quantity {item.quantity}
                        </h3>
                      </div>
                      <div>Total {item.quantity * item.price}</div>
                    </div>
                  ))}
                </div>
                <button
                  className="border border-highlight px-4 py-2 rounded-lg"
                  onClick={() => clearCollection("Table" + active)}
                >
                  Clear Order
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/3 flex">
          <div className="w-4/5 h-4/5 border shadow-2xl m-auto">
            <h1>Reviews</h1>
            <ul>
              <l1> </l1>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
