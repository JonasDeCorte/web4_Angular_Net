using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RestApi.Models;
using RestApi.Models.DTO;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace RestApi.Controllers
{
    [ApiConventionType(typeof(DefaultApiConventions))]
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class PersoneelController : ControllerBase
    {
        public readonly IPersoneelRepository _personeelRepository;
        private readonly IImageRepository _imageRepository;
        public PersoneelController(IPersoneelRepository personeelRepository, IImageRepository imageRepository)
        {
            _personeelRepository = personeelRepository;
            _imageRepository = imageRepository;
        }
        /// <summary>
        /// get all Personeels - get Personeels by naam
        /// </summary>
        /// <param name="naam">de naam van de Personeel</param>
        /// <returns></returns>
        [HttpGet]
        public IEnumerable<Personeel> GetPersoneels(string naam)
        {
            if (naam == null)
                return _personeelRepository.GetAll().OrderBy(r => r.Name);
            return _personeelRepository.GetAll().Where(x => x.Name.Equals(naam)).OrderBy(r => r.Name);
        }
        [HttpPost("addImage/{id}")]
        [AllowAnonymous]
        public ActionResult<String> AddImage(int id)
        {
            IFormFile files = Request.Form.Files[0];
            Personeel persoon = _personeelRepository.GetBy(id);

            if (files != null)
            {
                MemoryStream ms = new MemoryStream();
                files.CopyTo(ms);
                Image image = new Image
                {

                    ImageData = ms.ToArray(),
                    Persoon = persoon,
                    PersoonId = persoon.Id

                };
                _imageRepository.AddImage(image);
                _imageRepository.SaveChanges();

                return Ok();
            }
            return BadRequest();

        }
        [HttpGet("getImage/{id}")]
        public ActionResult<Image> GetImage(int id)
        {
            try
            {
                Image image = _imageRepository.GetById(id);
                ImageDTO imageDTO = new ImageDTO
                {
                    ImageData = image.ImageData,
                    PersoonId = image.PersoonId
                };
                return Ok(imageDTO);
            }
            catch
            {
                return Ok(null);
            }
        }

            /// <summary>
            /// get Personeel by id 
            /// </summary>
            /// <param name="id">de id van een Personeel</param>
            /// <returns></returns>
            [HttpGet("{id}")]
            public ActionResult<Personeel> GetPersoneel(int id)
        {
            Personeel Personeel = _personeelRepository.GetBy(id);
            if (Personeel == null) return NotFound();
            return Personeel;
        }
        /// <summary>
        /// maak een Personeel aan
        /// </summary>
        /// <param name="Personeel">de nieuwe Personeel</param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult<Personeel> PostPersoneel(Personeel Personeel)
        {
            try
            {
                _personeelRepository.Add(Personeel);
                _personeelRepository.SaveChanges();
                return CreatedAtAction(nameof(GetPersoneel), new { id = Personeel.Id }, Personeel);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }



            // link om de nieuwe Personeel op te vragen

        }
        /// <summary>
        /// update de gegevens van een Personeel
        /// </summary>
        /// <param name="id">id van een Personeel</param>
        /// <param name="Personeel">de nieuwe gegevens van de Personeel</param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public IActionResult PutPersoneel(int id, Personeel Personeel)
        {
            if (id != Personeel.Id)
            {
                return BadRequest();
            }
            _personeelRepository.Update(Personeel);
            _personeelRepository.SaveChanges();
            // 204(no content) of 200 + Personeel 
            return NoContent();
        }
        /// <summary>
        /// verwijderen van een Personeel
        /// </summary>
        /// <param name="id">id van de te verwijderen Personeel</param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public IActionResult DeletePersoneel(int id)
        {
            Personeel Personeel = _personeelRepository.GetBy(id);
            if (Personeel == null)
            {
                return NotFound();
            }
            _personeelRepository.Delete(Personeel);
            _personeelRepository.SaveChanges();
            return NoContent();
        }
    }
}
