import { User, FoundItem, LostItem, Mail, Image } from "../schema.js";

async function queryFoundItems(
  category,
  location,
  startTime,
  endTime,
  name,
  student_id
) {
  // make a mongoose query object
  let query = {};
  if (category) {
    query.category = category;
  }
  if (location) {
    query.found_location = location;
  }
  if (startTime || endTime) {
    query.time = {};
    if (startTime) {
      let startDate = new Date(startTime);
      query.time.$gte = startDate.toISOString();
    }
    if (endTime) {
      let endDate = new Date(endTime);
      query.time.$lte = endDate.toISOString();
    }
  }
  if (name) {
    query["mislayer_clue.name"] = name;
  }
  if (student_id) {
    query["mislayer_clue.student_id"] = student_id;
  }

  // actual query
  try {
    const data = await FoundItem.find(query)
      .select({
        category: 1,
        found_location: 1,
        time: 1,
        remark: 1,
        mislayer_clue: 1,
      })
      .exec();
    return data;
  } catch (error) {
    throw error;
  }
}

export { queryFoundItems };
