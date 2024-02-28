import dayjs from "dayjs";

export const dateFormater = ({time, format}) => {
  const formated = time instanceof dayjs ? time.format(format) : time
  return formated
};
