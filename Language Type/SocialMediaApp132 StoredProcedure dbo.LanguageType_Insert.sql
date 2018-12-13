USE [SocialMediaApp132]
GO
/****** Object:  StoredProcedure [dbo].[LanguageType_Insert]    Script Date: 9/11/2018 9:56:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Moonsoo Jo>
-- Create date: <07/02/2018>
-- Description:	<Insert a language type>
-- =============================================
ALTER PROCEDURE [dbo].[LanguageType_Insert]
	-- Add the parameters for the stored procedure here
    @TypeName nvarchar(50),
	@TypeDescription nvarchar(150),
	@Id int output
AS
BEGIN
/* TEST SCRIPT
DECLARE	@return_value int

EXEC	@return_value = [dbo].[LanguageType_Insert]
		@TypeName = N'Korean',
		@TypeDescription = N'Korean language'

SELECT	'Return Value' = @return_value
*/
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	Insert into dbo.LanguageType
	values (@TypeName, @TypeDescription)
	set @Id = SCOPE_IDENTITY()
END
