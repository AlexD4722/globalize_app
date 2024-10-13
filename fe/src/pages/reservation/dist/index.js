"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.ReservationContext = void 0;
var classic_button_1 = require("@/components/button/classic-button");
var combo_box_1 = require("@/components/form/combo-box");
var input_field_1 = require("@/components/form/input-field");
var text_area_field_1 = require("@/components/form/text_area-field");
var layout_1 = require("@/components/layout");
var svg_1 = require("@/components/svg");
var CheckoutPage_1 = require("@/components/ui/CheckoutPage");
var date_converter_1 = require("@/function/date-converter");
var day_counter_1 = require("@/function/day-counter");
var rank_matching_description_1 = require("@/function/rank-matching-description");
var fe_config_1 = require("@/settings/fe_config");
var react_query_1 = require("@tanstack/react-query");
var clsx_1 = require("clsx");
var head_1 = require("next/head");
var image_1 = require("next/image");
var router_1 = require("next/router");
var react_1 = require("react");
var react_hook_form_1 = require("react-hook-form");
exports.ReservationContext = react_1.createContext(null);
var arrivalTimeArray = function () {
    var arrivalTimes = __spreadArrays(Array(24)).map(function (_, index) {
        return {
            id: "" + (index > 9 ? "" : "0") + index + "-" + (index > 9 ? "" : "0") + (index + 1),
            value: "" + (index > 9 ? "" : "0") + index + ":00 - " + (index + 1 > 9 ? "" : "0") + (index + 1) + ":00"
        };
    });
    return arrivalTimes;
};
var arrivalTime = __spreadArrays(arrivalTimeArray());
function Reservation() {
    var _a = router_1.useRouter(), query = _a.query, isReady = _a.isReady, push = _a.push, back = _a.back;
    var _b = react_1.useState("details"), phase = _b[0], setPhase = _b[1];
    var _c = react_1.useState(), currentPopertyInfo = _c[0], setCurrentPropertyInfo = _c[1];
    var _d = react_1.useState(), currentReservationInfo = _d[0], setCurrentReservationInfo = _d[1];
    var _e = react_1.useState(false), DetailedReserve = _e[0], setDetailedReserve = _e[1];
    var _f = react_1.useState(0), priceBeforeTaxAndCharge = _f[0], setPriceBeforeTaxAndCharge = _f[1];
    var _g = react_1.useState(0), taxAndCharge = _g[0], setTaxAndCharge = _g[1];
    var _h = react_1.useState(0), priceAfterTaxAndCharge = _h[0], setPriceAfterTaxAndCharge = _h[1];
    var _j = react_1.useState(), reservationFormData = _j[0], setReservationFormData = _j[1];
    var _k = react_1.useState(), confirmationStatus = _k[0], setConfirmationStatus = _k[1];
    var reserveMutation = react_query_1.useMutation({
        mutationKey: ["reserveRoom"]
    });
    react_1.useEffect(function () {
        if (isReady) {
            var _a = query, propertyReservationInfo = _a.propertyReservationInfo, reservationInfo = _a.reservationInfo;
            if (propertyReservationInfo && reservationInfo) {
                setCurrentPropertyInfo(JSON.parse(propertyReservationInfo));
                setCurrentReservationInfo(JSON.parse(reservationInfo));
            }
            else {
                push({
                    pathname: "/"
                });
            }
        }
    }, [query, isReady, push]);
    react_1.useEffect(function () {
        if (currentReservationInfo) {
            var lengthOfStays = day_counter_1.DayCounterBetweenDateRange(date_converter_1.convertDDMMYYYYtoDate(currentReservationInfo.checkIn, ""), date_converter_1.convertDDMMYYYYtoDate(currentReservationInfo.checkOut, ""));
            var priceBeforeTaxAndCharge_1 = currentReservationInfo.summary.totalPricePerNight * lengthOfStays;
            var taxAndCharge_1 = priceBeforeTaxAndCharge_1 * 0.1;
            var priceAfterTaxAndCharge_1 = priceBeforeTaxAndCharge_1 + taxAndCharge_1;
            setPriceBeforeTaxAndCharge(priceBeforeTaxAndCharge_1);
            setTaxAndCharge(taxAndCharge_1);
            setPriceAfterTaxAndCharge(priceAfterTaxAndCharge_1);
        }
    }, [currentReservationInfo]);
    return (React.createElement(exports.ReservationContext.Provider, { value: {
            setPhase: setPhase,
            currentReservationInfo: currentReservationInfo,
            reservationFormData: reservationFormData,
            setReservationFormData: setReservationFormData,
            confirmationStatus: confirmationStatus,
            setConfirmationStatus: setConfirmationStatus,
            reserveMutation: reserveMutation
        } },
        React.createElement(head_1["default"], null,
            React.createElement("title", null, "Reservation")),
        React.createElement("div", { className: "relative my-10 xs:hidden md:block" },
            React.createElement("div", { className: "absolute top-1/2 left-0 border-t border-borderDefault h-[1px] w-full my-auto -z-10" }),
            React.createElement("div", { className: "flex justify-between [&>div]:bg-white z-10 lg:text-lg xs:text-sm font-medium" },
                React.createElement("div", { className: "flex items-center pr-3" },
                    React.createElement("span", { className: "mr-2 lg:w-[2rem] xs:w-[1.25rem] lg:h-[2rem] xs:h-[1.25rem] rounded-full bg-theme text-white flex items-center justify-center lg:text-base xs:text-sm font-bold border border-transparent" },
                        React.createElement(svg_1.Check, null)),
                    React.createElement("span", null, "Selection")),
                React.createElement("div", { className: "flex items-center px-3" },
                    React.createElement("span", { className: "mr-2 lg:w-[2rem] xs:w-[1.25rem] lg:h-[2rem] xs:h-[1.25rem] rounded-full bg-theme text-white flex items-center justify-center lg:text-base xs:text-sm font-bold border border-transparent" }, phase === "details" ? React.createElement(React.Fragment, null, "2") : React.createElement(svg_1.Check, null)),
                    React.createElement("span", null, "Details")),
                React.createElement("div", { className: "flex items-center pl-3" },
                    React.createElement("span", { className: clsx_1["default"]("mr-2 lg:w-[2rem] xs:w-[1.25rem] lg:h-[2rem] xs:h-[1.25rem] rounded-full flex items-center justify-center lg:text-base xs:text-sm font-bold border border-theme", phase === "details" && "bg-white text-theme", phase === "confirmation" && "bg-theme text-white", phase === "notification" && "bg-theme text-white") }, phase === "notification" ? React.createElement(svg_1.Check, null) : React.createElement(React.Fragment, null, "3")),
                    React.createElement("span", null, "Confirmation")))),
        currentPopertyInfo && currentReservationInfo && (React.createElement("div", { className: "mb-20 mt-10 grid lg:grid-cols-[40%_60%] xs:grid-cols-1 gap-5 lg:pr-5 items-start" },
            React.createElement("div", { className: "border border-borderDefault rounded-2xl p-8 w-full hover:elevation-shadow-2 duration-200" },
                React.createElement("div", null,
                    React.createElement("div", { className: "text-3xl font-medium" }, currentPopertyInfo.propertyName),
                    React.createElement("div", { className: "my-3" }, currentPopertyInfo.propertyAddress),
                    React.createElement("div", { className: "py-3" },
                        React.createElement(image_1["default"], { src: fe_config_1.JAVA_URL + "/" + currentPopertyInfo.propertyFeaturedImage, alt: currentPopertyInfo.propertyName, width: 50, height: 50, className: "w-1/2 h-auto aspect-video rounded-lg" })),
                    React.createElement("div", { className: "flex items-center mt-3 text-lg mb-1" },
                        React.createElement("div", { className: "flex items-center mr-5" },
                            React.createElement("span", { className: "mr-1 text-theme" },
                                React.createElement(svg_1.StarRate, null)),
                            React.createElement("span", null, currentPopertyInfo.propertyReview.averageRating.toFixed(1))),
                        React.createElement("div", { className: "font-medium" }, rank_matching_description_1.matchRatingRank(currentPopertyInfo.propertyReview.averageRating))),
                    React.createElement("div", { className: "text-textUnfocus" },
                        "from ",
                        currentPopertyInfo.propertyReview.totalReviews,
                        " verified guests reviews")),
                React.createElement("div", { className: "w-full h-[1px] border-t border-borderDefault my-8" }),
                React.createElement("div", null,
                    React.createElement("div", { className: "text-xl mb-5" }, "Rerservation details"),
                    React.createElement("div", { className: "grid grid-cols-2" },
                        React.createElement("div", null,
                            React.createElement("div", { className: "text-base" }, "Check-in"),
                            React.createElement("div", { className: "font-medium text-lg" }, date_converter_1.convertDDMMYYYYtoDate(currentReservationInfo.checkIn, "").toDateString())),
                        React.createElement("div", null,
                            React.createElement("div", { className: "text-base" }, "Check-out"),
                            React.createElement("div", { className: "font-medium text-lg" }, date_converter_1.convertDDMMYYYYtoDate(currentReservationInfo.checkOut, "").toDateString()))),
                    React.createElement("div", { className: "mt-5" },
                        React.createElement("div", null, "Total length of stays"),
                        React.createElement("div", { className: "font-medium text-lg" },
                            day_counter_1.DayCounterBetweenDateRange(date_converter_1.convertDDMMYYYYtoDate(currentReservationInfo.checkIn, ""), date_converter_1.convertDDMMYYYYtoDate(currentReservationInfo.checkOut, "")),
                            " ",
                            "night(s)."))),
                React.createElement("div", { className: "mt-10" },
                    React.createElement("div", { className: "flex items-center justify-between" },
                        React.createElement("div", null,
                            React.createElement("div", { className: "text-xl mb-2" }, "Your selection"),
                            React.createElement("div", { className: "font-medium text-lg" },
                                React.createElement("span", null,
                                    currentReservationInfo.summary.totalRooms,
                                    " room(s) for\u00A0"),
                                React.createElement("span", null,
                                    currentReservationInfo.adults,
                                    " ",
                                    currentReservationInfo.adults > 1 ? "adults" : "adult"),
                                currentReservationInfo.children > 0 && (React.createElement("span", null,
                                    ", ",
                                    currentReservationInfo.children,
                                    " ",
                                    currentReservationInfo.children > 1
                                        ? "children"
                                        : "child")),
                                React.createElement("span", null, "."))),
                        React.createElement("button", { onClick: function () { return setDetailedReserve(!DetailedReserve); }, className: "text-2xl p-2 rounded-full hover:bg-theme hover:text-white hover:cursor-pointer active:scale-10" },
                            React.createElement(svg_1.ChevronRight, { className: clsx_1["default"](DetailedReserve ? "rotate-90" : "rotate-[-90deg]") }))),
                    React.createElement("div", null, DetailedReserve && (React.createElement("div", { className: "border border-borderDefault rounded-lg py-3 px-4 mt-5 elevation-color-2" },
                        React.createElement("div", { className: "mb-2" }, "Rooms selection summary:"),
                        currentReservationInfo.details.map(function (room) { return (React.createElement("div", { key: room.roomName, className: "mb-2 last:mb-0" },
                            React.createElement("div", { className: "text-lg font-medium" },
                                "x ",
                                room.roomAmount,
                                " ",
                                room.roomName),
                            React.createElement("div", { className: "" },
                                "for $",
                                room.pricePerRoom,
                                " per night"))); }))))),
                React.createElement("div", { className: "w-full h-[1px] border-t border-borderDefault my-8" }),
                React.createElement("div", null,
                    React.createElement("div", { className: "text-xl mb-5" }, "Price summary"),
                    React.createElement("table", { className: "[&_th]:text-left [&_th]:text-lg [&_th]:font-medium [&_th]:p-2 [&_td]:p-2 [&_td]:text-xl [&_td]:font-medium  table-fixed w-full" },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("th", null, "Price"),
                                React.createElement("td", null,
                                    "$",
                                    priceBeforeTaxAndCharge)),
                            React.createElement("tr", null,
                                React.createElement("th", null, "Tax and Charge"),
                                React.createElement("td", null,
                                    "$",
                                    taxAndCharge)),
                            React.createElement("tr", null,
                                React.createElement("th", { className: "text-xl" }, "Total"),
                                React.createElement("td", null,
                                    "$",
                                    priceAfterTaxAndCharge)))))),
            phase === "details" && React.createElement(DetailsPhase, null),
            phase === "confirmation" && React.createElement(ConfirmationPhase, { price: priceAfterTaxAndCharge }),
            phase === "notification" && React.createElement(NotificationPhase, null)))));
}
exports["default"] = Reservation;
//Notification Phase
var NotificationPhase = function () {
    var router = router_1.useRouter();
    var _a = react_1.useContext(exports.ReservationContext), confirmationStatus = _a.confirmationStatus, setConfirmationStatus = _a.setConfirmationStatus, reserveMutation = _a.reserveMutation;
    var statusColor = new Map([
        ["success", "text-green-500"],
        ["failed", "text-red-500"],
        ["pending", "text-gray-500"],
        ["error", "text-red-500"],
    ]);
    var statusTitle = new Map([
        ["success", "Success"],
        ["failed", "Failed"],
        ["pending", "Pending"],
        ["error", "Error"],
    ]);
    react_1.useEffect(function () {
        switch (reserveMutation.status) {
            case "success":
                setConfirmationStatus({
                    status: "success",
                    message: "Your reservation is successfully confirmed!"
                });
                break;
            case "idle":
                setConfirmationStatus({
                    status: "pending",
                    message: "Your request is about to send."
                });
            case "pending":
                setConfirmationStatus({
                    status: "pending",
                    message: "Wait a minute, your booking request is being processed."
                });
                break;
            case "error":
                setConfirmationStatus({
                    status: "error",
                    message: "An error occurred, please try again later!"
                });
                break;
            default:
                setConfirmationStatus({
                    status: "error",
                    message: "An error occurred, please try again later!!"
                });
                break;
        }
    }, [reserveMutation.status]);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "border border-borderDefault rounded-2xl grid grid-flow-row gap-5" },
            React.createElement("div", { className: "lg:p-8 sm:p-3" },
                React.createElement("div", { className: "text-2xl mb-3" },
                    React.createElement("span", null, "Reservation status: "),
                    React.createElement("span", { className: statusColor.get(confirmationStatus === null || confirmationStatus === void 0 ? void 0 : confirmationStatus.status) }, statusTitle.get(confirmationStatus === null || confirmationStatus === void 0 ? void 0 : confirmationStatus.status))),
                React.createElement("div", { className: "text-lg mb-5" }, confirmationStatus === null || confirmationStatus === void 0 ? void 0 : confirmationStatus.message),
                React.createElement(classic_button_1["default"], { intent: "secondary", rounded: "regular", onClick: function () {
                        router.push("/");
                    } }, "Go to Homepage!")))));
};
//Confirmation Phase
var ConfirmationPhase = function (_a) {
    var _b, _c, _d;
    var price = _a.price;
    var router = router_1.useRouter();
    var methods = react_hook_form_1.useForm();
    var _e = react_1.useContext(exports.ReservationContext), setPhase = _e.setPhase, setReservationFormData = _e.setReservationFormData, reservationFormData = _e.reservationFormData, currentReservationInfo = _e.currentReservationInfo, setConfirmationStatus = _e.setConfirmationStatus, reserveMutation = _e.reserveMutation;
    var _f = react_1.useState({
        checkInDate: (_b = currentReservationInfo === null || currentReservationInfo === void 0 ? void 0 : currentReservationInfo.checkIn) !== null && _b !== void 0 ? _b : "",
        checkOutDate: (_c = currentReservationInfo === null || currentReservationInfo === void 0 ? void 0 : currentReservationInfo.checkOut) !== null && _c !== void 0 ? _c : "",
        roomId: (_d = currentReservationInfo === null || currentReservationInfo === void 0 ? void 0 : currentReservationInfo.details[0].roomId) !== null && _d !== void 0 ? _d : ""
    }), reservationOptions = _f[0], setReservationOptions = _f[1];
    var onSubmit = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var reservationOptions;
        var _a, _b, _c;
        return __generator(this, function (_d) {
            reservationOptions = {
                checkInDate: (_a = currentReservationInfo === null || currentReservationInfo === void 0 ? void 0 : currentReservationInfo.checkIn) !== null && _a !== void 0 ? _a : "",
                checkOutDate: (_b = currentReservationInfo === null || currentReservationInfo === void 0 ? void 0 : currentReservationInfo.checkOut) !== null && _b !== void 0 ? _b : "",
                roomId: (_c = currentReservationInfo === null || currentReservationInfo === void 0 ? void 0 : currentReservationInfo.details[0].roomId) !== null && _c !== void 0 ? _c : ""
            };
            // Call reserveMutation here
            reserveMutation.mutate(reservationOptions);
            // Change the phase to notification
            setPhase("notification");
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "instant"
            });
            return [2 /*return*/];
        });
    }); };
    var movePageNotification = function () {
        setPhase("notification");
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant"
        });
    };
    var _g = react_1.useState(), paymentMethod = _g[0], setPaymentMethod = _g[1];
    var payment = [
        { id: 1, value: "Visa/MasterCard" },
        { id: 2, value: "Paypal" },
    ];
    return (React.createElement(React.Fragment, null,
        React.createElement(react_hook_form_1.FormProvider, __assign({}, methods),
            React.createElement("div", null,
                React.createElement("form", { onSubmit: methods.handleSubmit(onSubmit) },
                    React.createElement("div", { className: "border border-borderDefault rounded-2xl grid grid-flow-row gap-5" },
                        React.createElement("div", { className: "lg:p-8 sm:p-3" },
                            React.createElement("div", { className: "text-2xl mb-5" }, "Your informations:"),
                            React.createElement("ul", { className: "grid-flow-row grid gap-5 [&>div]:w-full" },
                                React.createElement("li", null,
                                    React.createElement("span", null, "Fullname: "),
                                    React.createElement("span", { className: "font-medium" }, reservationFormData === null || reservationFormData === void 0 ? void 0 : reservationFormData.fullname)),
                                React.createElement("li", null,
                                    React.createElement("span", null, "Email: "),
                                    React.createElement("span", { className: "font-medium" }, reservationFormData === null || reservationFormData === void 0 ? void 0 : reservationFormData["email-reservation"])),
                                React.createElement("li", null,
                                    React.createElement("span", null, "Phone: "),
                                    React.createElement("span", { className: "font-medium" }, reservationFormData === null || reservationFormData === void 0 ? void 0 : reservationFormData.phone)),
                                React.createElement("li", null,
                                    React.createElement("span", null, "City/Region: "),
                                    React.createElement("span", { className: "font-medium" }, reservationFormData === null || reservationFormData === void 0 ? void 0 : reservationFormData.address)))),
                        React.createElement("div", { className: "h-[1px] w-full border-t border-borderDefault" }),
                        React.createElement("div", { className: "lg:p-8 sm:p-3" },
                            React.createElement("div", { className: "text-2xl mb-5" }, "Special Requests"),
                            React.createElement("div", { className: "mb-5 text-sm text-textUnfocus" }, "Special requests cannot be guaranteed - but the property will do its best to meet your needs. You can always make a special request after your booking is complete!"),
                            React.createElement("div", null,
                                React.createElement("p", null, reservationFormData === null || reservationFormData === void 0 ? void 0 : reservationFormData["special-requests"]))),
                        React.createElement("div", { className: "h-[1px] w-full border-t border-borderDefault" }),
                        React.createElement("div", { className: "lg:p-8 sm:p-3" },
                            React.createElement("div", { className: "text-2xl mb-5" }, "Your arrival time"),
                            React.createElement("div", null,
                                React.createElement("span", null, "Estimated arrival time: "),
                                React.createElement("span", { className: "font-medium" }, reservationFormData === null || reservationFormData === void 0 ? void 0 : reservationFormData["arrival-time"]))))),
                React.createElement("div", { className: "mt-5 border border-borderDefault rounded-2xl grid grid-flow-row gap-5" },
                    React.createElement("div", { className: "lg:p-8 sm:p-3" },
                        React.createElement("div", { className: "text-2xl mb-5" }, "Payment method"),
                        React.createElement("p", { className: "text-xl mb-5" }, "You must deposit 25% of the total order in advance."),
                        React.createElement("div", null),
                        "    ",
                        reservationOptions && React.createElement(CheckoutPage_1.CheckoutPage, { amount: Math.floor(price * 0.25), reservationOrder: reservationOptions, move: movePageNotification }))),
                React.createElement("div", { className: "w-full flex items-end justify-between mt-5" },
                    React.createElement(classic_button_1["default"], { type: "button", intent: "secondary", rounded: "regular", onClick: function () { return setPhase("details"); } }, "To Previous Step"))))));
};
//Details Phase
var DetailsPhase = function () {
    var _a, _b, _c, _d;
    var _e = react_1.useContext(exports.ReservationContext), setPhase = _e.setPhase, setReservationFormData = _e.setReservationFormData, reservationFormData = _e.reservationFormData, currentReservationInfo = _e.currentReservationInfo;
    var methods = react_hook_form_1.useForm();
    var profileQuery = react_query_1.useQuery({
        queryKey: ["guestProfile"]
    });
    var onSubmit = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            //Handle submitted data here
            //Push data to back-end on return reservation id
            //Redirect to Confirmation page only when received reservation id
            setReservationFormData(data);
            setPhase("confirmation");
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "instant"
            });
            return [2 /*return*/];
        });
    }); };
    return (React.createElement(React.Fragment, null,
        " ",
        profileQuery.isSuccess && (React.createElement(react_hook_form_1.FormProvider, __assign({}, methods),
            React.createElement("form", { onSubmit: methods.handleSubmit(onSubmit) },
                React.createElement("div", { className: "border border-borderDefault rounded-2xl grid grid-flow-row gap-5" },
                    React.createElement("div", { className: "lg:p-8 sm:p-3" },
                        React.createElement("div", { className: "text-2xl mb-5" }, "Your informations:"),
                        React.createElement("div", { className: "grid-flow-row grid gap-5 [&>div]:w-full" },
                            React.createElement("div", null,
                                React.createElement(input_field_1.RHFInputField, { inputName: "fullname", label: "Your fullname", registerOptions: {
                                        value: reservationFormData
                                            ? reservationFormData["fullname"]
                                            : ((_a = profileQuery.data) === null || _a === void 0 ? void 0 : _a.firstName) + " " + ((_b = profileQuery.data) === null || _b === void 0 ? void 0 : _b.lastName),
                                        required: {
                                            value: true,
                                            message: "This field is required!"
                                        }
                                    } })),
                            React.createElement("div", { className: "grid lg:grid-cols-2 xs:grid-cols-1 gap-5" },
                                React.createElement(input_field_1.RHFInputField, { inputName: "email-reservation", label: "Email address", registerOptions: {
                                        value: reservationFormData
                                            ? reservationFormData["email-reservation"]
                                            : (_c = profileQuery.data) === null || _c === void 0 ? void 0 : _c.email,
                                        pattern: {
                                            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                            message: "Email must in correct format!"
                                        },
                                        required: {
                                            value: true,
                                            message: "This field is required!"
                                        }
                                    } }),
                                React.createElement(input_field_1.RHFInputField, { inputName: "phone", label: "Phone number", registerOptions: {
                                        value: reservationFormData
                                            ? reservationFormData["phone"]
                                            : (_d = profileQuery.data) === null || _d === void 0 ? void 0 : _d.phoneNumber,
                                        pattern: {
                                            value: /^[0-9]{10,}$/,
                                            message: "Phone number must atleast 10 digits!"
                                        },
                                        required: {
                                            value: true,
                                            message: "This field is required!"
                                        }
                                    } })),
                            React.createElement("div", null,
                                React.createElement(input_field_1.RHFInputField, { inputName: "address", label: "Where you from? (City/Region)", registerOptions: {
                                        value: reservationFormData
                                            ? reservationFormData["address"]
                                            : ""
                                    } }))),
                        React.createElement("div", { className: "text-2xl mb-5 mt-10" }, "Your rooms:"),
                        React.createElement("div", null, currentReservationInfo &&
                            currentReservationInfo.details.map(function (room) { return (React.createElement("div", { key: room.roomId, className: "pb-5 border-b border-borderDefault last:border-0 mb-5 last:mb-0" },
                                React.createElement("div", null,
                                    React.createElement("div", { className: "text-2xl mb-2 font-bold" },
                                        room.roomName,
                                        " ",
                                        room.roomAmount > 1 && (React.createElement("span", null,
                                            "x ",
                                            room.roomAmount))),
                                    React.createElement("div", { className: "py-3" },
                                        React.createElement(image_1["default"], { src: fe_config_1.JAVA_URL + "/" + room.roomFeaturedImage, alt: room.roomName, width: 50, height: 50, className: "w-1/3 h-auto aspect-video rounded-lg" })),
                                    React.createElement("div", { className: "flex items-center mt-2" },
                                        React.createElement("span", null,
                                            React.createElement(svg_1.Person, null)),
                                        React.createElement("span", null,
                                            "\u00A0Guests: x",
                                            room.maxGuests,
                                            " adults"))))); }))),
                    React.createElement("div", { className: "h-[1px] w-full border-t border-borderDefault" }),
                    React.createElement("div", { className: "lg:p-8 sm:p-3" },
                        React.createElement("div", { className: "text-2xl mb-5" }, "Special Requests"),
                        React.createElement("div", { className: "mb-5" }, "Special requests cannot be guaranteed - but the property will do its best to meet your needs. You can always make a special request after your booking is complete!"),
                        React.createElement("div", null,
                            React.createElement(text_area_field_1.RHFTextAreaField, { inputName: "special-requests", label: "Your request", rows: 3, registerOptions: {
                                    value: reservationFormData
                                        ? reservationFormData["special-requests"]
                                        : ""
                                } }))),
                    React.createElement("div", { className: "h-[1px] w-full border-t border-borderDefault" }),
                    React.createElement("div", { className: "lg:p-8 sm:p-3" },
                        React.createElement("div", { className: "text-2xl mb-5" }, "Your arrival time"),
                        React.createElement("div", { className: "mb-5" },
                            "Add your estimated arrival time",
                            " ",
                            React.createElement("span", { className: "text-theme" }, "*")),
                        React.createElement("div", null,
                            React.createElement(combo_box_1.ComboBox, { width: "fit", name: "arrival-time", defaultValue: reservationFormData
                                    ? reservationFormData["arrival-time"]
                                    : "", options: arrivalTime, required: {
                                    value: true,
                                    message: "This field is required!"
                                } })))),
                React.createElement("div", { className: "w-full flex items-end justify-end mt-5" },
                    React.createElement(classic_button_1["default"], { type: "submit", rounded: "regular" }, "To Next Step")))))));
};
Reservation.getLayout = function getLayout(page) {
    return React.createElement(layout_1.GuestLayout, null, page);
};
