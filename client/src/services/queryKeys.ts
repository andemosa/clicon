export const queryKeys = {
  getCities: (countryId: number, stateId: number) => [
    "cities",
    countryId,
    stateId,
  ],
  getProfile: ["getProfile"],

  signup: ["signup"],
  signin: ["signin"],
};
