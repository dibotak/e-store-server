module.exports = (err, req, res, next) => {
  if (err.errors) {
    res.status(400).json(err);
  } else if (err.message == "WRONG") {
    res.status(400).json({message: "wrong email / password"})
  } else if (err.message == "didn't have access") {
    res.status(401).json({message: "didn't have access"})
  } else if (err.message == 'NOT FOUND') {
    res.status(404).json({message: 'NOT FOUND'})
  } else {
    res.status(500).json(err);
  }
}