using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RestApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace RestApi.Controllers
{
    [ApiConventionType(typeof(DefaultApiConventions))]
    [Produces("application/json")]
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiController]
    public class BewonerController : ControllerBase
    {
        public readonly IBewonerRepository _bewonerRepository;
        private readonly IAdminRepository _adminRepository;
        public BewonerController(IBewonerRepository bewonerRepository, IAdminRepository adminRepository)
        {
            _bewonerRepository = bewonerRepository;
            _adminRepository = adminRepository;
        }
        /// <summary>
        /// get all bewoners - get bewoners by naam
        /// </summary>
        /// <param name="naam">de naam van de bewoner</param>
        /// <returns></returns>
        [HttpGet]
       [Authorize]
        public IEnumerable<Bewoner> GetBewoners(string naam) {
            if(naam == null)
                return _bewonerRepository.GetAll().OrderBy(r => r.Name);
            return _bewonerRepository.GetAll().Where(x => x.Name.Equals(naam)).OrderBy(r => r.Name);
        }
        /// <summary>
        /// get bewoner by id 
        /// </summary>
        /// <param name="id">de id van een bewoner</param>
        /// <returns></returns>
        [HttpGet("{id}")]
        [Authorize]
        public ActionResult<Bewoner> GetBewoner(int id)
        {
            Bewoner bewoner = _bewonerRepository.GetBy(id);
            if (bewoner == null) return NotFound();
            return bewoner;
        }
        /// <summary>
        /// maak een bewoner aan
        /// </summary>
        /// <param name="bewoner">de nieuwe bewoner</param>
        /// <returns></returns>
        [HttpPost]
        [Authorize]
        public ActionResult<Bewoner> PostBewoner(Bewoner bewoner)
        {
            try
            {
                _bewonerRepository.Add(bewoner);
                _bewonerRepository.SaveChanges();
                return CreatedAtAction(nameof(GetBewoner), new { id = bewoner.Id }, bewoner);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
         
           
           
            // link om de nieuwe bewoner op te vragen
           
        }
        /// <summary>
        /// update de gegevens van een bewoner
        /// </summary>
        /// <param name="id">id van een bewoner</param>
        /// <param name="bewoner">de nieuwe gegevens van de bewoner</param>
        /// <returns></returns>
        [HttpPut("{id}")]
        [Authorize]
        public IActionResult PutBewoner(int id, Bewoner bewoner)
        {
           Bewoner bewonerDB =  _bewonerRepository.GetBy(id);
            if (id != bewoner.Id)
            {
                return BadRequest();
            }
            bewonerDB.Name = bewoner.Name;
            bewonerDB.WordtGehaald = bewoner.WordtGehaald;
            bewonerDB.GeboorteDatum = bewoner.GeboorteDatum;
            bewonerDB.EetOpKamer = bewoner.EetOpKamer;     
            _bewonerRepository.Update(bewonerDB);
            _bewonerRepository.SaveChanges();
            // 204(no content) of 200 + bewoner 
            return NoContent();
        }
        /// <summary>
        /// verwijderen van een bewoner
        /// </summary>
        /// <param name="id">id van de te verwijderen bewoner</param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        [Authorize]
        public IActionResult DeleteBewoner(int id)
        {
            Bewoner bewoner = _bewonerRepository.GetBy(id);
            if (bewoner == null)
            {
                return NotFound();
            }
            _bewonerRepository.Delete(bewoner);
            _bewonerRepository.SaveChanges();
            return NoContent();
        }

    }
}
