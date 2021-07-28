using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorController : ControllerBase
    {

        [Route("LoadItems")]
        [HttpPost]
        public IActionResult LoadItems(Framework.AllCriteria criteria)
        {
            var vm = new ViewModels.AuthorVm();
            try
            {
                vm.Initialise();
                return new JsonResult(vm);
            }

            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [Route("LoadAuthorItem")]
        [HttpGet]
        public IActionResult LoadAuthorItem(int id)
        {
            var vm = new ViewModels.AuthorVm();
            try
            {
                vm.LoadItem(id);
                return new JsonResult(vm);
            }

            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("DeleteRecord")]
        [HttpGet]
        public IActionResult DeleteRecord(int id)
        {
            var vm = new ViewModels.AuthorVm();
            try
            {
                vm.DeleteItem(id);
                return new JsonResult(vm);
            }

            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [Route("PostAuthor")]
        [HttpPost]
        public IActionResult PostAuthor(ViewModels.AuthorVm vm)
        {
            try
            {
                vm.Upsert();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            return new JsonResult(vm);
        }


    }
}
