using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NAudio.Wave;
using NAudio.Lame;
using System.IO;

namespace little_big_audio_tools.Controllers
{
    public class AudioController : Controller
    {
        // POST: AudioController/Convert
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Convert(IFormFile inputFile, string outputFormat)
        {
            if (inputFile == null || string.IsNullOrEmpty(outputFormat))
            {
                return BadRequest("Invalid input file or output format.");
            }

            var outputFilePath = Path.ChangeExtension(Path.GetTempFileName(), outputFormat);

            try
            {
                using (var inputStream = inputFile.OpenReadStream())
                using (var reader = new AudioFileReader(inputFile.FileName))
                using (var writer = new LameMP3FileWriter(outputFilePath, reader.WaveFormat, LAMEPreset.STANDARD))
                {
                    reader.CopyTo(writer);
                }

                var outputFileBytes = System.IO.File.ReadAllBytes(outputFilePath);
                return File(outputFileBytes, "audio/mpeg", Path.GetFileName(outputFilePath));
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error converting audio file.");
            }
        }

        // POST: AudioController/Trim
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Trim(IFormFile inputFile, double startTime, double endTime)
        {
            if (inputFile == null || startTime < 0 || endTime <= startTime)
            {
                return BadRequest("Invalid input file or time range.");
            }

            var outputFilePath = Path.GetTempFileName();

            try
            {
                using (var inputStream = inputFile.OpenReadStream())
                using (var reader = new AudioFileReader(inputFile.FileName))
                using (var writer = new WaveFileWriter(outputFilePath, reader.WaveFormat))
                {
                    reader.CurrentTime = TimeSpan.FromSeconds(startTime);
                    var endTimeSpan = TimeSpan.FromSeconds(endTime);

                    while (reader.CurrentTime < endTimeSpan)
                    {
                        var buffer = new byte[1024];
                        int bytesRead = reader.Read(buffer, 0, buffer.Length);
                        if (bytesRead == 0) break;
                        writer.Write(buffer, 0, bytesRead);
                    }
                }

                var outputFileBytes = System.IO.File.ReadAllBytes(outputFilePath);
                return File(outputFileBytes, "audio/wav", Path.GetFileName(outputFilePath));
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error trimming audio file.");
            }
        }
    }
}
