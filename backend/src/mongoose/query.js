import { FoundItem } from "../schema.js";

async function queryFoundItems({
  category,
  location,
  startTime,
  endTime,
  name,
  student_id,
  remark,
}) {
  // make a mongoose query object
  let query = {};
  if (category) {
    query.category = category;
  }
  if (location) {
    query["found_location.location"] = location;
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
  if (remark) {
    query.$or = [];
    query.$or.push({ remark: { $regex: remark } });
    query.$or.push({ "mislayer_clue.name": { $regex: remark } });
    query.$or.push({ "mislayer_clue.student_id": { $regex: remark } });
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

// use lost item (a object) to query
// query: (category) and (>time) and ((remark) or (locations.location))
// we don't care about mislayer here, which will be handled by other query
async function queryFoundItemWithLostItem(lostItem) {
  const { category, time, remark, locations } = lostItem;
  let query = {};
  // 2 required critiria: category, time
  if (category) {
    query.category = category;
  }
  if (time) {
    const date = new Date(time);
    query.time = { $gte: date.toISOString() };
  }
  // for "or" query
  query.$or = [];
  if (remark) {
    query.$or.push({ remark: { $regex: remark } });
  }
  if (locations) {
    for (let location of locations) {
      query.$or.push({ "found_location.location": location.location });
    }
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

export { queryFoundItems, queryFoundItemWithLostItem };
