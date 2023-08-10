import React, { useState } from "react";
import Footer from "../../Components/Footer/Footer";
import CancelIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import PrintIcon from "@mui/icons-material/Print";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./Inventory.css";
import { useSelector } from "react-redux";
import Navigation from "../../Components/Navigation/Navigation";
import {
    Button as MuiButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
} from "@mui/material";

function Inventory() {
    const mode = useSelector((state) => state.darkMode);
    const [searchBox, setSearchBox] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogItemCategory, setDialogItemCategory] = useState("");
    const [dialogItemName, setDialogItemName] = useState("");
    const [dialogItemPrice, setDialogItemPrice] = useState("");

    const inventoryArray = [
        {
            category: "Kitchen",
            item: "Fan",
            price: 15.99,
        },
        {
            category: "Bedroom",
            item: "Clock",
            price: 30.0,
        },
        {
            category: "Garage",
            item: "Stand",
            price: 9.99,
        },
        {
            category: "Living room",
            item: "TV",
            price: 1099.99,
        },
        {
            category: "Office",
            item: "Table",
            price: 50.0,
        },
        {
            category: "Kitchen",
            item: "Fan",
            price: 15.99,
        },
        {
            category: "Bedroom",
            item: "Clock",
            price: 30.0,
        },
        {
            category: "Garage",
            item: "Stand",
            price: 9.99,
        },
        {
            category: "Living room",
            item: "TV",
            price: 1099.99,
        },
        {
            category: "Office",
            item: "Table",
            price: 50.0,
        },
        {
            category: "Kitchen",
            item: "Fan",
            price: 15.99,
        },
        {
            category: "Bedroom",
            item: "Clock",
            price: 30.0,
        },
        {
            category: "Garage",
            item: "Stand",
            price: 9.99,
        },
        {
            category: "Living room",
            item: "TV",
            price: 1099.99,
        },
        {
            category: "Office",
            item: "Table",
            price: 50.0,
        },
    ];

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <>
            <Navigation />
            <div className="inventory-body-main">
                <div className="my-[15vh] smallMobile:mx-5 mobile:mx-5 tablet:mx-0 laptop:mx-0 desktop:mx-0">
                    <div className="flex flex-row items-start justify-evenly flex-wrap mt-8 smallMobile:gap-3 mobile:gap-5 tablet:gap-5 laptop:gap-0 desktop:gap-0">
                        <div
                            className="min-h-fit smallMobile:w-auto mobile:w-full tablet:w-3/4 laptop:w-auto desktop:w-auto rounded-[10px] shadow-[0_2px_4px_rgb(0_0_0_/_10%)_,_0_8px_16px_rgb(0_0_0_/_10%)] backdrop-blur-[10px] bg-[#ffffffd6] p-0 pb-8"
                            style={{
                                backgroundColor: `${mode.bgCard}`,
                                color: `${mode.colorCard}`,
                            }}
                        >
                            <div className="m-8 text-[20px] font-bold flex flex-row justify-between items-center">
                                <div
                                    className={`${
                                        searchBox &&
                                        "smallMobile:invisible mobile:invisible tablet:visible laptop:visible desktop:visible smallMobile:font-extralight mobile:font-extralight tablet:font-bold laptop:font-bold desktop:font-bold smallMobile:text-[15px] mobile:text-[15px] tablet:text-[20px] laptop:text-[20px] desktop:text-[20px]"
                                    }`}
                                >
                                    {inventoryArray.length > 0
                                        ? `You have ${inventoryArray.length} ${
                                              inventoryArray.length > 1
                                                  ? "items"
                                                  : "item"
                                          } in your inventory`
                                        : "You don't have any items yet"}
                                </div>
                                <div className="flex flex-row justify-center items-center">
                                    {searchBox ? (
                                        <div>
                                            <input
                                                type="text"
                                                className="px-1 py-[0.05rem] smallMobile:text-[10px] mobile:text-[20px] tablet:text-[15px] laptop:text-[15px] desktop:text-[15px] w-40 text-left rounded-md outline-none border-solid border-[1px] border-[#dddfe2]"
                                                name="itemSearch"
                                                placeholder="Search item"
                                                style={{
                                                    backgroundColor: `${mode.bgCard}`,
                                                    color: `${mode.colorCard}`,
                                                }}
                                            />
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                    <span
                                        onClick={() => {
                                            setSearchBox(!searchBox);
                                        }}
                                        className="py-[0.05rem] flex flex-row justify-center items-center hover:cursor-pointer"
                                    >
                                        {searchBox ? (
                                            <>
                                                <CloseIcon />
                                            </>
                                        ) : (
                                            <SearchIcon />
                                        )}
                                    </span>
                                </div>
                            </div>
                            <table className="tableCSS m-8 border-collapse h-[40vh] overflow-y-scroll block text-left">
                                <tbody>
                                    <tr>
                                        <th>Category</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th></th>
                                    </tr>
                                    {inventoryArray.map((item, i) => (
                                        <tr
                                            key={i}
                                            className="hover:bg-[#b6c4c7fb] transition-all duration-300 rounded-sm"
                                        >
                                            <td>{item.category}</td>
                                            <td>{item.item}</td>
                                            <td>{item.price}</td>
                                            <td>
                                                <div
                                                    onClick={() => {
                                                        setDialogItemCategory(
                                                            item.category
                                                        );
                                                        setDialogItemName(
                                                            item.item
                                                        );
                                                        setDialogItemPrice(
                                                            item.price
                                                        );
                                                        setOpenDialog(true);
                                                    }}
                                                    className="w-fit cursor-pointer"
                                                >
                                                    <MoreVertIcon />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <div
                                className="min-h-fit w-full rounded-[10px] shadow-[0_2px_4px_rgb(0_0_0_/_10%)_,_0_8px_16px_rgb(0_0_0_/_10%)] backdrop-blur-[10px] bg-[#ffffffd6] p-5 flex flex-col justify-start items-start gap-5"
                                style={{
                                    backgroundColor: `${mode.bgCard}`,
                                    color: `${mode.colorCard}`,
                                }}
                            >
                                <div className="w-full text-center font-bold text-xl">
                                    Control panel
                                </div>
                                <div className="flex flex-col justify-start items-start gap-2 w-full">
                                    <div className="flex flex-row justify-start items-center gap-4 border-gray-400 border-2 p-2 rounded-md w-full cursor-pointer">
                                        <AddIcon />
                                        <span>Add new item</span>
                                    </div>
                                    <div className="flex flex-row justify-start items-center gap-4 border-gray-400 border-2 p-2 rounded-md w-full cursor-pointer">
                                        <PrintIcon />
                                        <span>Export</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Dialog Box */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogContent>
                    <DialogContentText>
                        <span className="flex flex-row justify-start items-center gap-4">
                            <span className="font-bold">Category: </span>
                        </span>
                        {dialogItemCategory}
                    </DialogContentText>
                    <DialogContentText>
                        <span className="flex flex-row justify-start items-center gap-4">
                            <span className="font-bold">Name: </span>
                        </span>
                        {dialogItemName}
                    </DialogContentText>
                    <DialogContentText>
                        <span className="flex flex-row justify-start items-center gap-4">
                            <span className="font-bold">Price: </span>
                        </span>
                        {dialogItemPrice}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <MuiButton
                        onClick={handleCloseDialog}
                        color="inherit"
                        className="flex flex-row justify-start items-center gap-4"
                    >
                        <EditIcon />
                        <span>Edit</span>
                    </MuiButton>
                    <MuiButton onClick={handleCloseDialog} color="inherit">
                        <div className="flex flex-row justify-start items-center gap-4 text-red-600">
                            <CancelIcon />
                            <span>Delete</span>
                        </div>
                    </MuiButton>
                </DialogActions>
            </Dialog>

            <Footer />
        </>
    );
}

export default Inventory;
