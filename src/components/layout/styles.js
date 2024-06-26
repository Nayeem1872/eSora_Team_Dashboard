const styles = {
  flexColumn: "flex flex-col",
  justifyCenterItemsCenter: "flex items-center justify-center",

  font14weight600: "text-[14px] font-semibold",
  font14weight400: "text-[14px] font-normal",

  //   content
  contentContainer: `w-full my-[16px] ml-[16px] p-[48px] rounded-l-3xl bg-white text-headerText overflow-auto`,

  //  side navbar
  navbarContainer: "w-[280px] flex flex-col",

  navbarLogoDiv: "flex justify-center py-8",

  navbarItemsContainer: "px-4 flex flex-col justify-between h-full",

  inactiveClass: `flex items-center w-full p-2 text-grayText text-[16px] font-medium cursor-pointer`,

  activeClass: `flex items-center w-full p-2 text-gray-100 bg-lighterPrimary rounded-md text-[16px] font-bold cursor-pointer`,

  navbarAccountInfoContainer: "flex px-4 py-6 items-center w-full",
  navbarAccountImage: `mr-2 h-9 w-9  flex justify-center items-center rounded-full bg-lighterPrimary`,

  logoutContainer:
    "flex items-center justify-center w-full p-2 mb-6 cursor-pointer",
  logoutText: `mr-2 text-grayText text-[14px] font-medium`,
};
export default styles;
