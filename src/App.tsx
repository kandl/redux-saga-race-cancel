import React, { useEffect } from "react";
import {
    Container,
    Button,
    AppBar,
    Toolbar,
    makeStyles,
    CircularProgress,
    ButtonGroup,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";
import { dashboardIdSelector } from "./redux/selectors";
import {
    isEditingSelector,
    viewDataStatusSelector,
    viewDataSelector,
    editDataStatusSelector,
    dashboardEditDataSelector,
} from "./redux/selectors";
import {
    leaveDashboardEditMode,
    enterDashboardEditMode,
    initializeDashboard,
} from "./redux/actions";

const useStyles = makeStyles((theme) => ({
    toolbar: {
        justifyContent: "space-between",
    },
    container: {
        padding: "20px",
    },
}));

export const App: React.FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const isEditing = useSelector(isEditingSelector);
    const viewDataStatus = useSelector(viewDataStatusSelector);
    const viewData = useSelector(viewDataSelector);
    const editDataStatus = useSelector(editDataStatusSelector);
    const editData = useSelector(dashboardEditDataSelector);
    const dashboardId = useSelector(dashboardIdSelector);

    const onEditButtonClick = () => dispatch(enterDashboardEditMode());
    const onCancelButtonClick = () => dispatch(leaveDashboardEditMode());
    const switchDashboard = (dashboardId: string) =>
        dispatch(initializeDashboard(dashboardId));

    useEffect(() => {
        dispatch(initializeDashboard(dashboardId));
    }, []);

    return (
        <>
            <AppBar
                position="static"
                variant="elevation"
                color={isEditing ? "primary" : "default"}
            >
                <Toolbar className={classes.toolbar}>
                    <ButtonGroup>
                        {[
                            "dashboard1",
                            "dashboard2",
                            "dashboard3",
                            "dashboard4",
                            "dashboard5",
                        ].map((id) => (
                            <Button
                                key={id}
                                onClick={() => switchDashboard(id)}
                                variant="outlined"
                                color={
                                    dashboardId === id ? "secondary" : "default"
                                }
                            >
                                {id}
                            </Button>
                        ))}
                    </ButtonGroup>

                    {isEditing ? (
                        <ButtonGroup>
                            <Button
                                onClick={onCancelButtonClick}
                                variant="contained"
                                color="secondary"
                                disabled={
                                    viewDataStatus !== "success" ||
                                    editDataStatus !== "success"
                                }
                            >
                                Save
                            </Button>
                            <Button
                                onClick={onCancelButtonClick}
                                variant="contained"
                                color="secondary"
                            >
                                Cancel
                            </Button>
                        </ButtonGroup>
                    ) : (
                        <Button
                            onClick={onEditButtonClick}
                            variant="contained"
                            color="primary"
                        >
                            Edit
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
            <Container maxWidth="lg" className={classes.container}>
                {viewDataStatus === "pending" && <CircularProgress />}
                {viewDataStatus === "success" && (
                    <Alert severity="success">
                        Dashboard data loaded! {viewData}
                    </Alert>
                )}
                {editDataStatus === "pending" && <CircularProgress />}
                {editDataStatus === "success" && (
                    <Alert severity="success">
                        Dashboard edit data loaded! {editData}
                    </Alert>
                )}
            </Container>
        </>
    );
};
