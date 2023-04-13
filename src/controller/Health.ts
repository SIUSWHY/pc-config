const sendStatus = async function (req: any, res: any) {
  try {
    res.status(200).send({ status: 'OK' });
  } catch (err) {
    console.error(err);
  }
};

export default { sendStatus };
