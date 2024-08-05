import moment from "moment-timezone";
import "moment-timezone";
const start = moment().tz("Asia/Jakarta").format("YYYY-MM-DD");
const end = moment().tz("Asia/Jakarta").format("YYYY-MM-DD");

export default () => ({
  start: start,
  end: end,
  santri: []
})
