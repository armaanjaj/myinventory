import React, { useEffect, useState } from "react";
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
    MenuItem,
    TextField,
    DialogTitle,
} from "@mui/material";
import useAuth from "../../Hooks/useAuth";
import jwtDecode from "jwt-decode";
import axios from "axios";
import Loader from "../../Components/Loaders/Loader-FS";
import { PDFDocument, rgb, StandardFonts, PageSizes } from "pdf-lib";

const INVENTORY_URL = "/api/auth/inventory";
const CATEGORY_URL = "/api/categories";

function Inventory() {
    // CHECK IF THE USER IS LOGGED IN, OTHERWISE REDIRECT TO LOGIN PAGE
    useAuth("INVENTORY");

    const mode = useSelector((state) => state.darkMode);
    const token = useSelector((state) => state.auth.user?.token);

    const [searchBox, setSearchBox] = useState(false);
    const [inventoryArray, setInventoryArray] = useState([]);
    const [categoryArray, setCategoryArray] = useState([]);
    const [ownerEmail, setOwnerEmail] = useState("");
    const [loading, setLoading] = useState(false);

    // options dialog box
    const [openOptionsDialog, setOpenOptionsDialog] = useState(false);
    const [dialogItemCategory, setDialogItemCategory] = useState("");
    const [dialogItemName, setDialogItemName] = useState("");
    const [dialogItemPrice, setDialogItemPrice] = useState("");
    const [dialogItemId, setDialogItemId] = useState("");

    // add item dialog box
    const [openAddItemDialog, setOpenAddItemDialog] = useState(false);
    const [dialogFieldCategory, setDialogFieldCategory] = useState("");
    const [dialogFieldItemName, setDialogFieldItemName] = useState("");
    const [dialogFieldItemPrice, setDialogFieldItemPrice] = useState("");

    // edit item dialog box
    const [opeEditItemDialog, setOpenEditItemDialog] = useState(false);
    const [dialogEditFieldCategory, setDialogEditFieldCategory] = useState("");
    const [dialogEditFieldItemName, setDialogEditFieldItemName] = useState("");
    const [dialogEditFieldItemPrice, setDialogEditFieldItemPrice] =
        useState("");

    // success dialog box
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
    const [successDialogTitle, setSuccessDialogTitle] = useState("");
    const [successDialogContent, setSuccessDialogContent] = useState("");

    // options dialog handler
    const handleCloseOptionsDialog = () => {
        setOpenOptionsDialog(false);
    };

    // add item dialog handler
    const handleOpenAddItemDialog = () => {
        getAllCategories();
        setOpenAddItemDialog(true);
    };
    const handleCloseAddItemDialog = () => {
        setDialogFieldCategory("");
        setDialogFieldItemName("");
        setDialogFieldItemPrice("");
        setOpenAddItemDialog(false);
    };

    // edit item dialog handler
    const handleHydrateEditDialog = (data) => {
        getAllCategories();
        setDialogEditFieldCategory(data.category);
        setDialogEditFieldItemName(data.item_name);
        setDialogEditFieldItemPrice(data.price);
        setOpenEditItemDialog(true);
    };
    const handleCloseEditItemDialog = () => {
        setDialogEditFieldCategory("");
        setDialogEditFieldItemName("");
        setDialogEditFieldItemPrice("");
    };

    // DATA FETCHERS & HANDLERS
    const getAllItems = (email) => {
        setLoading(true);

        axios
            .get(INVENTORY_URL, {
                params: {
                    email: email,
                },
                headers: {
                    "x-auth-token": token,
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                if (response.data) {
                    if (!response.data.success) {
                        setInventoryArray(response.data);
                    } else {
                        setInventoryArray([]);
                    }
                } else {
                    setInventoryArray([]);
                }
            })
            .catch((error) => {
                // Handle error
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const getAllCategories = () => {
        axios
            .get(CATEGORY_URL)
            .then((response) => {
                if (response.data) {
                    setCategoryArray(response.data.data);
                }
            })
            .catch((error) => {
                // console.log(error);
            });
    };

    const handleAddNewItemSubmit = (e) => {
        e.preventDefault();

        setOpenAddItemDialog(false);
        setLoading(true);

        let inventoryBody = {
            category: dialogFieldCategory,
            itemName: dialogFieldItemName,
            price: dialogFieldItemPrice,
            email: ownerEmail,
        };

        axios
            .post(INVENTORY_URL, inventoryBody, {
                headers: {
                    "x-auth-token": token,
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                if (response.data) {
                    // console.log(response.data);
                    handleCloseAddItemDialog();
                    getAllItems(ownerEmail);
                    setSuccessDialogTitle("Success");
                    setSuccessDialogContent(response.data.message);
                    setOpenSuccessDialog(true);
                }
            })
            .catch((error) => {
                // console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handlePressEdit = (itemId) => {
        setOpenOptionsDialog(false);
        setLoading(true);

        axios
            .get(INVENTORY_URL + `/${itemId}`, {
                params: {
                    email: ownerEmail,
                },
                headers: {
                    "x-auth-token": token,
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                if (response.data) {
                    handleHydrateEditDialog(response.data[0]);
                }
            })
            .catch((error) => {
                // console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleEditItemSubmit = (e) => {
        e.preventDefault();

        setOpenEditItemDialog(false);
        setLoading(true);

        let inventoryBody = {
            category: dialogEditFieldCategory,
            itemName: dialogEditFieldItemName,
            price: dialogEditFieldItemPrice,
            email: ownerEmail,
        };

        axios
            .put(INVENTORY_URL + `/${dialogItemId}`, inventoryBody, {
                headers: {
                    "x-auth-token": token,
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                if (response.data) {
                    handleCloseEditItemDialog();
                    getAllItems(ownerEmail);
                    setSuccessDialogTitle("Success");
                    setSuccessDialogContent(response.data.message);
                    setOpenSuccessDialog(true);
                }
            })
            .catch((error) => {
                // console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handlePressDelete = () => {
        setOpenOptionsDialog(false);
        setLoading(true);

        axios
            .delete(INVENTORY_URL + `/${dialogItemId}`, {
                headers: {
                    "x-auth-token": token,
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                if (response.data) {
                    getAllItems(ownerEmail);
                    setSuccessDialogTitle("Success");
                    setSuccessDialogContent(response.data.message);
                    setOpenSuccessDialog(true);
                }
            })
            .catch((error) => {
                // console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        if (token !== undefined) {
            let jwtData = jwtDecode(token);
            setOwnerEmail(jwtData.email);
            getAllItems(jwtData.email);
        }
    }, [token]);

    async function generatePDF(inventoryData) {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage(PageSizes.A4);

        // Set font and font size
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
        page.drawText("MyInventory", {
            x: 40,
            y: page.getHeight() - 50,
            font,
            size: 24,
            color: rgb(0, 0, 0),
        });

        let x = 40
        let y = page.getHeight() - 90;

        page.drawText(`Owner: ${ownerEmail}`, {
            x,
            y,
            font,
            size: 11,
            color: rgb(0, 0, 0),
        });
        page.drawText(`${new Date().getMonth() + 1}/${new Date().getDate()}/${new Date().getFullYear()}`, {
            x: x + 450,
            y,
            font,
            size: 11,
            color: rgb(0, 0, 0),
        });

        y -= 50

        // TABLE HEAD
        page.drawText('Category', {
            x,
            y,
            font,
            size: 15,
            color: rgb(0, 0, 0),
        });
        page.drawText('Name', {
            x: x + 200,
            y,
            font,
            size: 15,
            color: rgb(0, 0, 0),
        });
        page.drawText('Price', {
            x: x + 400,
            y,
            font,
            size: 15,
            color: rgb(0, 0, 0),
        });

        y -= 20;

        let totalValue = 0;

        for (const item of inventoryData) {
            y -= 15;
            page.drawText(`${item.category_name}`, {
                x,
                y,
                font,
                size: 12,
                color: rgb(0, 0, 0),
            });
            page.drawText(`${item.item_name}`, {
                x: x + 200,
                y,
                font,
                size: 12,
                color: rgb(0, 0, 0),
            });
            page.drawText(`$ ${item.price}`, {
                x: x + 400,
                y,
                font,
                size: 12,
                color: rgb(0, 0, 0),
            });

            totalValue += Number(item.price)
        }

        y -= 25;

        page.drawText(`Total value: $ ${totalValue.toFixed(2)}`, {
            x: x + 300,
            y,
            font,
            size: 14,
            color: rgb(0, 0, 0),
        });

        const pdfBytes = await pdfDoc.save();
        return pdfBytes;
    }

    function downloadPDF(pdfBytes) {
        const blob = new Blob([pdfBytes], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "inventory_report.pdf";
        link.click();
    }

    function fetchInventoryAndGeneratePDF() {
        axios
            .get(INVENTORY_URL, {
                params: {
                    email: ownerEmail,
                },
                headers: {
                    "x-auth-token": token,
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                if (response.data && !response.data.success) {
                    const inventoryData = response.data;
                    generatePDF(inventoryData).then(downloadPDF);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <>
            {loading && <Loader />}
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
                                            <td>{item.category_name}</td>
                                            <td>{item.item_name}</td>
                                            <td>{item.price}</td>
                                            <td>
                                                <div
                                                    onClick={() => {
                                                        setDialogItemCategory(
                                                            item.category_name
                                                        );
                                                        setDialogItemName(
                                                            item.item_name
                                                        );
                                                        setDialogItemPrice(
                                                            item.price
                                                        );
                                                        setDialogItemId(
                                                            item.item_id
                                                        );
                                                        setOpenOptionsDialog(
                                                            true
                                                        );
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
                                    <div
                                        onClick={handleOpenAddItemDialog}
                                        className="flex flex-row justify-start items-center gap-4 border-gray-400 border-2 p-2 rounded-md w-full cursor-pointer"
                                    >
                                        <AddIcon />
                                        <span>Add new item</span>
                                    </div>
                                    <div
                                        onClick={fetchInventoryAndGeneratePDF}
                                        className="flex flex-row justify-start items-center gap-4 border-gray-400 border-2 p-2 rounded-md w-full cursor-pointer"
                                    >
                                        <PrintIcon />
                                        <span>Export</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Options dialog box */}
            <Dialog open={openOptionsDialog} onClose={handleCloseOptionsDialog}>
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
                        onClick={() => handlePressEdit(dialogItemId)}
                        color="inherit"
                        className="flex flex-row justify-start items-center gap-4"
                    >
                        <EditIcon />
                        <span>Edit</span>
                    </MuiButton>
                    <MuiButton
                        onClick={() => handlePressDelete(dialogItemId)}
                        color="inherit"
                    >
                        <div className="flex flex-row justify-start items-center gap-4 text-red-600">
                            <CancelIcon />
                            <span>Delete</span>
                        </div>
                    </MuiButton>
                </DialogActions>
            </Dialog>

            {/* Add item dialog box */}
            <Dialog open={openAddItemDialog} onClose={handleCloseAddItemDialog}>
                <DialogTitle>Add Item</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        select
                        label="Categories"
                        fullWidth
                        required
                        value={dialogFieldCategory}
                        onChange={(e) => setDialogFieldCategory(e.target.value)}
                    >
                        {categoryArray.map((category) => (
                            <MenuItem
                                key={category.category_id}
                                value={category.category_id}
                            >
                                {category.category_name}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        margin="dense"
                        label="Item Name"
                        fullWidth
                        required
                        value={dialogFieldItemName}
                        onChange={(e) => setDialogFieldItemName(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Item Price"
                        fullWidth
                        required
                        value={dialogFieldItemPrice}
                        onChange={(e) =>
                            setDialogFieldItemPrice(e.target.value)
                        }
                    />
                </DialogContent>
                <DialogActions className="mt-2">
                    <MuiButton
                        onClick={handleCloseAddItemDialog}
                        color="primary"
                        className="mr-2"
                    >
                        Cancel
                    </MuiButton>
                    <MuiButton onClick={handleAddNewItemSubmit} color="primary">
                        Submit
                    </MuiButton>
                </DialogActions>
            </Dialog>

            {/* Edit item dialog box */}
            <Dialog
                open={opeEditItemDialog}
                onClose={handleCloseEditItemDialog}
            >
                <DialogTitle>Edit Item</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        select
                        label="Categories"
                        fullWidth
                        required
                        value={dialogEditFieldCategory}
                        onChange={(e) =>
                            setDialogEditFieldCategory(e.target.value)
                        }
                    >
                        {categoryArray.map((category) => (
                            <MenuItem
                                key={category.category_id}
                                value={category.category_id}
                            >
                                {category.category_name}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        margin="dense"
                        label="Item Name"
                        fullWidth
                        required
                        value={dialogEditFieldItemName}
                        onChange={(e) =>
                            setDialogEditFieldItemName(e.target.value)
                        }
                    />
                    <TextField
                        margin="dense"
                        label="Item Price"
                        type="number"
                        fullWidth
                        required
                        value={dialogEditFieldItemPrice}
                        onChange={(e) =>
                            setDialogEditFieldItemPrice(e.target.value)
                        }
                    />
                </DialogContent>
                <DialogActions className="mt-2">
                    <MuiButton
                        onClick={handleCloseEditItemDialog}
                        color="primary"
                        className="mr-2"
                    >
                        Cancel
                    </MuiButton>
                    <MuiButton onClick={handleEditItemSubmit} color="primary">
                        Submit
                    </MuiButton>
                </DialogActions>
            </Dialog>

            {/* Confirmation SUCCESS dialog */}
            <Dialog
                open={openSuccessDialog}
                onClose={() => setOpenSuccessDialog(false)}
            >
                <DialogTitle>{successDialogTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {successDialogContent}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <MuiButton
                        onClick={() => setOpenSuccessDialog(false)}
                        color="primary"
                        autoFocus
                    >
                        OK
                    </MuiButton>
                </DialogActions>
            </Dialog>

            <Footer />
        </>
    );
}

export default Inventory;
