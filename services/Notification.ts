import { notifications } from "@mantine/notifications";

export const showErrorNotification = (msg: string) => {
  notifications.show({
    autoClose: 2000,
    title: "Error",
    message: msg,
    color: "red",
  });
};

export const showSuccessNotification = (msg: string) => {
  notifications.show({
    autoClose: 2000,
    title: "Success",
    message: msg,
    color: "green",
  });
};
