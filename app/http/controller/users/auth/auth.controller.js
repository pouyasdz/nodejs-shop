const createHttpError = require("http-errors");
const { userModel } = require("../../../../models/users");
const { USER_ROLE, EXPIRES_IN } = require("../../../../utils/constans");
const { randomNumber, SignAccessToken } = require("../../../../utils/functions");
const {checkOTPSchema, getOTPSchema} = require("../../../validators/user/auth.schema");
const Controller = require("../../controller");

class UserAuthController extends Controller {
  async getOTP(req, res, next) {
    try {
      await getOTPSchema.validateAsync(req.body);
      const { mobile } = req.body;
      const code = randomNumber();
      const result = await this.saveUser(mobile, code);
      if (!result) throw createHttpError.Unauthorized("ورود شما انجام نشد");
      return res.status(200).send({
        data: {
          statusCode: 200,
          message: "کد اعتبارسنجی با موفقیت برای شما ارسال شد",
          code,
          mobile,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async checkOTP(req, res, next){
    try {
      await checkOTPSchema.validateAsync(req.body);
      const {mobile, code} = req.body;

      const user = await userModel.findOne({mobile});
      if(!user) throw createHttpError.NotFound("هیچ حسابی با این شماره موبایل یافت نشد");
      if(user.otp.code != code) throw createHttpError.Unauthorized("کد ارسال شده صحیح نمیباشد");
      const now = Date.now();
      if(+user.otp.expiresIn < now) throw createHttpError.Unauthorized("کد شما منقضی شده است");
      const accessToken = await SignAccessToken(user._id);
      return res.json({
        data :{
          accessToken
        }
      })
    } catch (error) {
      next(error)
    }
  }

  async saveUser(mobile, code) {
    const result = await this.checkExistUser(mobile);
    let otp = {
      code,
      expiresIn: EXPIRES_IN(),
    };

    if (result) {
      return await this.updateUser(mobile, { otp });
    }

    return !!(await userModel.create({
      mobile,
      otp,
      Roles: [USER_ROLE],
    }));
  }

  async checkExistUser(mobile) {
    const user = await userModel.findOne({ mobile });
    return !!user;
  }
  async updateUser(mobile, objectData = {}) {
    Object.keys(objectData).forEach((key) => {
      if (["", " ", 0, null, undefined, "0", NaN].includes(objectData[key]))
        delete objectData[key];
    });
    const updateResult = await userModel.updateOne(
      { mobile },
      { $set: objectData }
    );
    return !!updateResult.modifiedCount;
  }
}

module.exports = {
  UserAuthController: new UserAuthController(),
};
