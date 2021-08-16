using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace WebAPI.Other
{
    public class PassHash
    {
        private string actualPass, givenPass;
        public PassHash(string ActualPass , string GivenPass)
        {
            actualPass = ActualPass;
            givenPass = GivenPass;
        }

        public string getHashedPass()
        {
            //Hash Password
            byte[] salt;
            new RNGCryptoServiceProvider().GetBytes(salt = new byte[16]);

            var pbkdf2 = new Rfc2898DeriveBytes(actualPass, salt, 10000);
            byte[] hash = pbkdf2.GetBytes(20);

            byte[] hashBytes = new byte[36];
            Array.Copy(salt, 0, hashBytes, 0, 16);
            Array.Copy(hash, 0, hashBytes, 16, 20);

            string passwordHash = Convert.ToBase64String(hashBytes);
            return passwordHash;
        }

        public bool validatePassword()
        {
            string savedPasswordHash = actualPass;

            var hashBytes = Convert.FromBase64String(savedPasswordHash);
            byte[] salt = new byte[16];                                             //Get the salt
            Array.Copy(hashBytes, 0, salt, 0, 16);

            //Compute the hash the user enetered
            var pbkdf2 = new Rfc2898DeriveBytes(givenPass, salt, 10000);
            byte[] hash = pbkdf2.GetBytes(20);

            //Compare the result
            for(int i=0; i<20; i++)
            {
                if (hashBytes[i + 16] != hash[i])
                    return false;
            }
            return true;
        }
    }
}
