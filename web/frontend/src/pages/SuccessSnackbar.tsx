
// import PropTypes from "prop-types";
// import { makeStyles } from "@mui/material/styles";
// import { Snackbar, SnackbarContent, colors } from "@mui/material";
// import CheckCircleIcon from "@mui/icons-material/CheckCircleOutlined";

// const useStyles = makeStyles(theme: any => ({
//   content: {
//     backgroundColor: colors.green[600]
//   },
//   message: {
//     display: "flex",
//     alignItems: "center"
//   },
//   icon: {
//     marginRight: theme.spacing(2)
//   }
// }));

// const SuccessSnackbar = props => {
//   const { open, onClose } = props;

//   const classes = useStyles();

//   return (
//     <Snackbar
//       anchorOrigin={{
//         vertical: "top",
//         horizontal: "center"
//       }}
//       autoHideDuration={6000}
//       onClose={onClose}
//       open={open}
//     >
//       <SnackbarContent
//         className={classes.content}
//         message={
//           <span className={classes.message}>
//             <CheckCircleIcon className={classes.icon} />
//             Successfully saved changes!
//           </span>
//         }
//         variant="h6"
//       />
//     </Snackbar>
//   );
// };

// SuccessSnackbar.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   open: PropTypes.bool.isRequired
// };

// SuccessSnackbar.defaultProps = {
//   open: true,
//   onClose: () => {}
// };

// export default SuccessSnackbar;
