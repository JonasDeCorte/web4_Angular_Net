using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestApi.Models
{
    public class Admin
    {
        #region Properties
        //add extra properties if needed
        public int AdminId { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        #endregion

        #region Constructors
        public Admin()
        {
      
        }
        #endregion

    }
}

