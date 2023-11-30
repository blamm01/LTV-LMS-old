import { defaultPerm } from "../typings/permissions";

/**
 * 
 * @param {import("../typings/permissions").permsTypeOptional} include 
 * @param {import("../typings/permissions").permsTypeOptional} required 
 * @param {import("../typings/permissions").permsType} perms 
 * @param {boolean} requiredSuperuser
 * @param {boolean} isSuperuser 
 * @returns {boolean}
 */
export const checkPerms = (
    include = defaultPerm,
    required = defaultPerm,
    perms,
    requiredSuperuser = false,
    isSuperuser = false
  ) => {
    let passed = true;
    if (isSuperuser) return true;
    if(requiredSuperuser && !isSuperuser) return false;
    Object.keys(required).forEach((key) => {
      const arr = required[key];
      if (!arr || !Array.isArray(arr)) passed = false;
      else if (arr.length > 0)
        arr.map((v) =>
          !perms[key].includes(v)
            ? (passed = false)
            : null
        );
    });
    console.log(include, required, perms, requiredSuperuser, isSuperuser)
    Object.keys(include).forEach((key) => {
      const arr = include[key];
      if (!arr || !Array.isArray(arr)) passed = false;
      else if (
        arr.length > 0 &&
        arr
          .map((v) =>
            perms[key].includes(v)
          )
          .filter((v) => v).length === 0
      )
        passed = false;
    });
    return passed;
  };