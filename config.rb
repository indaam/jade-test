$targetFolder = "dist/test"
$targetFolderImg = "dist/test/img"

# COMPASS
# Configuration: http://compass-style.org/help/tutorials/configuration-reference/

# Require any additional compass plugins here.
# ----------------------------------------------
# require 'susy'
# require 'blend-mode'
# require 'zurb-foundation'
# require 'sassy-buttons'

# Can be :stand_alone or :rails. Defaults to :stand_alone
# ----------------------------------------------
project_type = :stand_alone

# paths
# Set this to the root of your project when deployed:
# ----------------------------------------------
http_path       = "/"
# css_dir         = $targetFolder
# sass_dir        = "src/test/sass/"
# images_dir      = $targetFolderImg
javascripts_dir = "js"
fonts_dir		= "fonts"

# You can select your preferred output style here (can be overridden via the command line):
# output option: nested, expanded, compact, compressed
# ----------------------------------------------
# output_style = :nested

# The environment mode.
# Defaults to :production, can also be :development
# Use :development to see line numbers, file names, etc
# ----------------------------------------------
environment = :production

# To disable debugging comments that display the original location of your selectors. Uncomment:
# ----------------------------------------------
# line_comments = true

# To enable relative paths to assets via compass helper functions. Uncomment:
# ----------------------------------------------
relative_assets = true

# disable the asset cache buster
# ----------------------------------------------
asset_cache_buster :none

Sass::Script::Number.precision = 40